# -*- coding: utf-8 -*-
import grequests
import pkg_resources

from defusedxml.ElementTree import fromstring
from mako.template import Template


def hook_egrid(config, response, lang, default_lang):
    if len(response.get('features')) < 1:
        return None

    results = []

    for result in response.get('features'):
        egrid = result.get('properties').get('label')[0:-8]
        results.append({
            'label': egrid,
            'egrid': egrid
        })

    return results


def hook_address(config, response, lang, default_lang):
    if len(response.get('features')) < 1:
        return None

    results = []

    for result in response.get('features'):
        results.append({
            'label': result.get('properties').get('label')[0:-10],
            'coordinates': result.get('geometry').get('coordinates')
        })

    return results


def hook_real_estate(config, response, lang, default_lang):
    if len(response.get('features')) < 1:
        return None

    wfs_filter = Template(filename=pkg_resources.resource_filename('samples', 'wfs_filter.xml'))

    requests = []
    headers = {'Content-Type': 'application/xml'}
    for result in response.get('features'):
        elements = result.get('properties').get('label')[0:-20].split(' ')
        filter = wfs_filter.render(
            layer_name='grundstueck',
            parcel_number=elements.pop(),
            municipality_name=' '.join(elements).replace(' (BL)', ''),
            limit=1
        ).encode('utf-8')
        requests.append(grequests.post('https://geowms.bl.ch', data=filter, headers=headers))

    results = []
    for req in grequests.map(requests):
        root = fromstring(req.text)
        res = {}
        for child in root:
            if child.tag == '{http://www.opengis.net/gml}featureMember':
                for real_estate in child:
                    for prop in real_estate:
                        if prop.tag == '{http://mapserver.gis.umn.edu/mapserver}egris_egrid':
                            res['egrid'] = prop.text
                        elif prop.tag == '{http://mapserver.gis.umn.edu/mapserver}gemeinde':
                            res['municipality'] = prop.text
                        elif prop.tag == '{http://mapserver.gis.umn.edu/mapserver}nummer':
                            res['number'] = prop.text
        if 'egrid' in res and 'municipality' in res and 'number' in res:
            results.append({
                'label': res['municipality'] + ' ' + res['number'],
                'egrid': res['egrid']
            })

    return results
