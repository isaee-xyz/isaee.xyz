#!/usr/bin/python3
"""Forced SSH command: receive only a static-site archive and activate atomically."""
from pathlib import Path
import datetime
import os
import sys
import tarfile
import uuid

base = Path('/opt/isaee-site/site')
release = base / 'releases' / (datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ') + '-' + uuid.uuid4().hex[:8])
release.mkdir(parents=True)
total = 0
count = 0
with tarfile.open(fileobj=sys.stdin.buffer, mode='r|gz') as archive:
    for member in archive:
        name = Path(member.name)
        if name.is_absolute() or '..' in name.parts or not (member.isdir() or member.isfile()):
            raise SystemExit('Rejected unsafe archive entry')
        total += member.size
        count += 1
        if total > 32 * 1024 * 1024 or count > 2000:
            raise SystemExit('Release exceeds size limit')
        dest = release / name
        if member.isdir():
            dest.mkdir(parents=True, exist_ok=True)
        else:
            dest.parent.mkdir(parents=True, exist_ok=True)
            source = archive.extractfile(member)
            with dest.open('wb') as output:
                while chunk := source.read(65536):
                    output.write(chunk)
            dest.chmod(0o644)
for required in ('index.html', 'interactive-blogs/index.html', 'interactive-blogs/ai-text-watermarking/index.html'):
    if not (release / required).is_file():
        raise SystemExit('Incomplete release: ' + required)
link = base / ('next-' + uuid.uuid4().hex)
link.symlink_to(release.relative_to(base))
os.replace(link, base / 'current')
print('Published release ' + release.name)
