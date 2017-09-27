# -*- coding: utf-8 -*-
import os
import subprocess
import pkg_resources
from pyramid.httpexceptions import HTTPNotFound, HTTPOk


class Depswriter(object):
    def __init__(self, request):
        """Calculates dependencies for the Google Closure Library and returns the generated JavaScript file.

        Args:
            request (pyramid.request.Request): The request instance.

        """
        if not request.application_url.startswith('http://localhost'):
            raise HTTPNotFound()

        self.request_ = request
        self.src_path_ = pkg_resources.resource_filename('oereb_client', 'static/js')
        self.node_path_ = pkg_resources.resource_filename('oereb_client', '../node_modules')
        self.depswriter_ = os.path.join(self.node_path_, 'google-closure-library', 'closure', 'bin', 'build',
                                        'depswriter.py')

    def get_params_(self):
        """Creates the commandline arguments for the depswriter call.

        Returns:
            str: Concatenated commandline arguments.

        """
        params = [
            '--root_with_prefix="{0} ../../../../static/js"'.format(self.src_path_),
            '--root_with_prefix="{0} ../../../../node_modules/google-closure-library/closure/goog"'.format(
                os.path.join(self.node_path_, 'google-closure-library', 'closure', 'goog')
            )
        ]
        return ' '.join(params)

    def run_(self):  # pragma: no cover
        """Runs the depswriter and returns the generated JavaScript content.

        Returns:
            str: The generated JavaScript content.

        """
        return subprocess.check_output('.venv/bin/python {0} {1}'.format(
            self.depswriter_,
            self.get_params_()
        ), shell=True)

    def render(self):  # pragma: no cover
        """Returns the generated JavaScript file.

        Returns:
            pyramid.httpexceptions.HTTPOk: HTTP response with JavaScript file as content.
        """
        return HTTPOk(body=self.run_())
