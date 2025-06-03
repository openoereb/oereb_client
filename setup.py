# -*- coding: utf-8 -*-
import codecs
import os
import sys

from setuptools import setup, find_packages
from datetime import datetime

VERSION = '2.3.0'

test_mode = False
is_beta = False
timestamp = datetime.now().strftime('%Y%m%d%H%M')

if "--test" in sys.argv:
    test_mode = True
    sys.argv.remove("--test")

if "beta" in VERSION:
    is_beta = True

here = os.path.abspath(os.path.dirname(__file__))
with codecs.open(os.path.join(here, 'README.rst'), encoding='utf-8') as f:
    README = f.read()
with codecs.open(os.path.join(here, 'CHANGELOG.rst'), encoding='utf-8') as f:
    CHANGES = f.read()

requires = [
    'pyaml-env',
    'pyramid',
    'pyramid_mako',
    'requests-futures',
    'waitress'
]

if test_mode or is_beta:
    development_status = "Development Status :: 4 - Beta"
else:
    development_status = "Development Status :: 5 - Production/Stable"

excluded_packages = ['test*']
if os.environ.get('CI'):
    excluded_packages.append('samples')

setup(
    name='oereb_client',
    version=VERSION.split('-')[0] + '-dev{0}'.format(timestamp) if test_mode else VERSION,
    description='ÖREB Client',
    long_description=README + '\n\n' + CHANGES,
    classifiers=[
        "License :: OSI Approved :: BSD License",
        development_status,
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Programming Language :: Python :: 3.12",
        "Framework :: Pyramid",
        "Topic :: Internet :: WWW/HTTP",
        "Topic :: Internet :: WWW/HTTP :: WSGI :: Application",
    ],
    author='Karsten Deininger',
    author_email='karsten.deininger@bl.ch',
    url='https://gitlab.com/gf-bl/oereb_client',
    keywords='web pyramid oereb client react openlayers',
    packages=find_packages(exclude=excluded_packages),
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
