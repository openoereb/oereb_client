# -*- coding: utf-8 -*-
import codecs
import os
import sys

from setuptools import setup, find_packages
from datetime import datetime

VERSION = '1.3.8'

test_mode = False
timestamp = datetime.now().strftime('%Y%m%d%H%M')

if "--test" in sys.argv:
    test_mode = True
    sys.argv.remove("--test")

here = os.path.abspath(os.path.dirname(__file__))
with codecs.open(os.path.join(here, 'README.rst'), encoding='utf-8') as f:
    README = f.read()
with codecs.open(os.path.join(here, 'CHANGELOG.rst'), encoding='utf-8') as f:
    CHANGES = f.read()

requires = [
    'pyramid',
    'pyramid_mako',
    'waitress'
]

setup(
    name='oereb_client',
    version=VERSION + '.dev{0}'.format(timestamp) if test_mode else VERSION,
    description='ÖREB Client',
    long_description=README + '\n\n' + CHANGES,
    classifiers=[
        "License :: OSI Approved :: BSD License",
        "Development Status :: 4 - Beta" if test_mode else "Development Status :: 5 - Production/Stable",
        "Programming Language :: Python :: 2.7",
        "Programming Language :: Python :: 3.6",
        "Framework :: Pyramid",
        "Topic :: Internet :: WWW/HTTP",
        "Topic :: Internet :: WWW/HTTP :: WSGI :: Application",
    ],
    author='Karsten Deininger',
    author_email='karsten.deininger@bl.ch',
    url='https://gitlab.com/gf-bl/oereb_client',
    keywords='web pyramid pylons oereb client angular openlayers',
    packages=find_packages(exclude=['samples', 'test*']),
    include_package_data=True,
    zip_safe=False,
    install_requires=requires,
    dependency_links=[],
    entry_points={
        'paste.app_factory': [
            'main = oereb_client:main'
        ]
    }
)
