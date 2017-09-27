# -*- coding: utf-8 -*-


class Index(object):
    def __init__(self, request):
        """Entry point for index rendering.

        Args:
            request (pyramid.request.Request): The request instance.

        """
        self.request_ = request

    def is_debug_(self):
        """Returns true if requested in debug mode.

        Returns:
            bool: True if requested in debug mode.

        """
        local = self.request_.application_url.startswith('http://localhost')
        debug = self.request_.params.get('debug') == 'true'
        return local and debug

    def render(self):
        """Returns the dictionary with rendering parameters.

        Returns:
            Dictionary with rendering parameters.

        """
        return {
            'debug': self.is_debug_()
        }
