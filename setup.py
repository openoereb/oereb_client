# -*- coding: utf-8 -*-
import codecs
import os

from setuptools import setup, find_packages

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
    version='1.2.0',
    description='ÖREB Client',
    long_description=README + '\n\n' + CHANGES,
    classifiers=[
        "Development Status :: 5 - Production/Stable",
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
