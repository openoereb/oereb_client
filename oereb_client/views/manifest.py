class Manifest(object):
    def __init__(self, request):
        """
        Entry point for manifest rendering.

        Args:
            request (pyramid.request.Request): The request instance.
        """
        self.request_ = request
        self.config_ = request.registry.settings.get('oereb_client', {}).get('application', {})

    def render(self):
        language = self.config_.get('default_language')
        name = None
        for item in self.config_.get('title'):
            if item.get('Language') == language:
                name = item.get('Text')
        return {
            'name': name,
            'start_url': self.request_.route_url('{0}/index'.format(self.request_.route_prefix))
        }