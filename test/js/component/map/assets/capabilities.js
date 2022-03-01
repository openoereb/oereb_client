export default `<?xml version="1.0" encoding="UTF-8"?>
<Capabilities version="1.0.0" xmlns="http://www.opengis.net/wmts/1.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:gml="http://www.opengis.net/gml" xsi:schemaLocation="http://schemas.opengis.net/wmts/1.0/wmtsGetCapabilities_response.xsd">
  <ows:ServiceIdentification> </ows:ServiceIdentification>
  <ows:ServiceProvider> </ows:ServiceProvider>
  <ows:OperationsMetadata>
    <ows:Operation name="GetCapabilities">
      <ows:DCP>
        <ows:HTTP>
          <ows:Get xlink:href="https://tile.geoview.bl.ch/1.0.0/WMTSCapabilities.xml">
            <ows:Constraint name="GetEncoding">
              <ows:AllowedValues>
                <ows:Value>REST</ows:Value>
              </ows:AllowedValues>
            </ows:Constraint>
          </ows:Get>
        </ows:HTTP>
      </ows:DCP>
    </ows:Operation>
    <ows:Operation name="GetTile">
      <ows:DCP>
        <ows:HTTP>
          <ows:Get xlink:href="https://tile.geoview.bl.ch/">
            <ows:Constraint name="GetEncoding">
              <ows:AllowedValues>
                <ows:Value>REST</ows:Value>
              </ows:AllowedValues>
            </ows:Constraint>
          </ows:Get>
          <ows:Get xlink:href="https://tile1.geoview.bl.ch/">
            <ows:Constraint name="GetEncoding">
              <ows:AllowedValues>
                <ows:Value>REST</ows:Value>
              </ows:AllowedValues>
            </ows:Constraint>
          </ows:Get>
          <ows:Get xlink:href="https://tile2.geoview.bl.ch/">
            <ows:Constraint name="GetEncoding">
              <ows:AllowedValues>
                <ows:Value>REST</ows:Value>
              </ows:AllowedValues>
            </ows:Constraint>
          </ows:Get>
          <ows:Get xlink:href="https://tile3.geoview.bl.ch/">
            <ows:Constraint name="GetEncoding">
              <ows:AllowedValues>
                <ows:Value>REST</ows:Value>
              </ows:AllowedValues>
            </ows:Constraint>
          </ows:Get>
          <ows:Get xlink:href="https://tile4.geoview.bl.ch/">
            <ows:Constraint name="GetEncoding">
              <ows:AllowedValues>
                <ows:Value>REST</ows:Value>
              </ows:AllowedValues>
            </ows:Constraint>
          </ows:Get>
        </ows:HTTP>
      </ows:DCP>
    </ows:Operation>
  </ows:OperationsMetadata>
  <!-- <ServiceMetadataURL xlink:href="" /> -->
  <Contents>

    <Layer>
      <ows:Title>dtm_av_relief_02m</ows:Title>
      <ows:Identifier>dtm_av_relief_02m</ows:Identifier>
      <Style isDefault="true">
        <ows:Identifier>default</ows:Identifier>
      </Style>
      <Format>image/jpeg</Format>
      <Dimension>
        <ows:Identifier>TIME</ows:Identifier>
        <Default>20070300</Default>
        <Value>20070300</Value>
      </Dimension>
      <ResourceURL format="image/jpeg" resourceType="tile" template="https://tile.geoview.bl.ch/1.0.0/dtm_av_relief_02m/default/{TIME}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg"/>
      <ResourceURL format="image/jpeg" resourceType="tile" template="https://tile1.geoview.bl.ch/1.0.0/dtm_av_relief_02m/default/{TIME}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg"/>
      <ResourceURL format="image/jpeg" resourceType="tile" template="https://tile2.geoview.bl.ch/1.0.0/dtm_av_relief_02m/default/{TIME}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg"/>
      <ResourceURL format="image/jpeg" resourceType="tile" template="https://tile3.geoview.bl.ch/1.0.0/dtm_av_relief_02m/default/{TIME}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg"/>
      <ResourceURL format="image/jpeg" resourceType="tile" template="https://tile4.geoview.bl.ch/1.0.0/dtm_av_relief_02m/default/{TIME}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg"/>
      <TileMatrixSetLink>
        <TileMatrixSet>swissgrid</TileMatrixSet>
      </TileMatrixSetLink>
    </Layer>

    <Layer>
      <ows:Title>lidar_agi_hs_dtm_1m</ows:Title>
      <ows:Identifier>lidar_agi_hs_dtm_1m</ows:Identifier>
      <Style isDefault="true">
        <ows:Identifier>default</ows:Identifier>
      </Style>
      <Format>image/jpeg</Format>
      <Dimension>
        <ows:Identifier>TIME</ows:Identifier>
        <Default>201803</Default>
        <Value>201803</Value>
      </Dimension>
      <ResourceURL format="image/jpeg" resourceType="tile" template="https://tile.geoview.bl.ch/1.0.0/lidar_agi_hs_dtm_1m/default/{TIME}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg"/>
      <ResourceURL format="image/jpeg" resourceType="tile" template="https://tile1.geoview.bl.ch/1.0.0/lidar_agi_hs_dtm_1m/default/{TIME}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg"/>
      <ResourceURL format="image/jpeg" resourceType="tile" template="https://tile2.geoview.bl.ch/1.0.0/lidar_agi_hs_dtm_1m/default/{TIME}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg"/>
      <ResourceURL format="image/jpeg" resourceType="tile" template="https://tile3.geoview.bl.ch/1.0.0/lidar_agi_hs_dtm_1m/default/{TIME}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg"/>
      <ResourceURL format="image/jpeg" resourceType="tile" template="https://tile4.geoview.bl.ch/1.0.0/lidar_agi_hs_dtm_1m/default/{TIME}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg"/>
      <TileMatrixSetLink>
        <TileMatrixSet>swissgrid</TileMatrixSet>
      </TileMatrixSetLink>
    </Layer>

    <Layer>
      <ows:Title>orthophoto_agi</ows:Title>
      <ows:Identifier>orthophoto_agi</ows:Identifier>
      <Style isDefault="true">
        <ows:Identifier>default</ows:Identifier>
      </Style>
      <Format>image/jpeg</Format>
      <Dimension>
        <ows:Identifier>TIME</ows:Identifier>
        <Default>20150422</Default>
        <Value>20150422</Value>
    <Value>20120726</Value>
      </Dimension>
      <ResourceURL format="image/jpeg" resourceType="tile" template="https://tile.geoview.bl.ch/1.0.0/orthophoto_agi/default/{TIME}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg"/>
      <ResourceURL format="image/jpeg" resourceType="tile" template="https://tile1.geoview.bl.ch/1.0.0/orthophoto_agi/default/{TIME}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg"/>
      <ResourceURL format="image/jpeg" resourceType="tile" template="https://tile2.geoview.bl.ch/1.0.0/orthophoto_agi/default/{TIME}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg"/>
      <ResourceURL format="image/jpeg" resourceType="tile" template="https://tile3.geoview.bl.ch/1.0.0/orthophoto_agi/default/{TIME}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg"/>
      <ResourceURL format="image/jpeg" resourceType="tile" template="https://tile4.geoview.bl.ch/1.0.0/orthophoto_agi/default/{TIME}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg"/>
      <TileMatrixSetLink>
        <TileMatrixSet>swissgrid</TileMatrixSet>
      </TileMatrixSetLink>
    </Layer>

    <Layer>
      <ows:Title>orthophoto_swisstopo</ows:Title>
      <ows:Identifier>orthophoto_swisstopo</ows:Identifier>
      <Style isDefault="true">
        <ows:Identifier>default</ows:Identifier>
      </Style>
      <Format>image/jpeg</Format>
      <Dimension>
        <ows:Identifier>TIME</ows:Identifier>
        <Default>20180420</Default>
        <Value>20180420</Value>
      </Dimension>
      <ResourceURL format="image/jpeg" resourceType="tile" template="https://tile.geoview.bl.ch/1.0.0/orthophoto_swisstopo/default/{TIME}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg"/>
      <ResourceURL format="image/jpeg" resourceType="tile" template="https://tile1.geoview.bl.ch/1.0.0/orthophoto_swisstopo/default/{TIME}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg"/>
      <ResourceURL format="image/jpeg" resourceType="tile" template="https://tile2.geoview.bl.ch/1.0.0/orthophoto_swisstopo/default/{TIME}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg"/>
      <ResourceURL format="image/jpeg" resourceType="tile" template="https://tile3.geoview.bl.ch/1.0.0/orthophoto_swisstopo/default/{TIME}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg"/>
      <ResourceURL format="image/jpeg" resourceType="tile" template="https://tile4.geoview.bl.ch/1.0.0/orthophoto_swisstopo/default/{TIME}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg"/>
      <TileMatrixSetLink>
        <TileMatrixSet>swissgrid</TileMatrixSet>
      </TileMatrixSetLink>
    </Layer>

    <Layer>
      <ows:Title>grundkarte_sw</ows:Title>
      <ows:Identifier>grundkarte_sw</ows:Identifier>
      <Style isDefault="true">
        <ows:Identifier>default</ows:Identifier>
      </Style>
      <Format>image/png</Format>
      <Dimension>
        <ows:Identifier>TIME</ows:Identifier>
        <Default>9999</Default>
        <Value>9999</Value>
      </Dimension>
      <ResourceURL format="image/png" resourceType="tile" template="https://tile.geoview.bl.ch/1.0.0/grundkarte_sw/default/{TIME}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png"/>
      <ResourceURL format="image/png" resourceType="tile" template="https://tile1.geoview.bl.ch/1.0.0/grundkarte_sw/default/{TIME}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png"/>
      <ResourceURL format="image/png" resourceType="tile" template="https://tile2.geoview.bl.ch/1.0.0/grundkarte_sw/default/{TIME}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png"/>
      <ResourceURL format="image/png" resourceType="tile" template="https://tile3.geoview.bl.ch/1.0.0/grundkarte_sw/default/{TIME}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png"/>
      <ResourceURL format="image/png" resourceType="tile" template="https://tile4.geoview.bl.ch/1.0.0/grundkarte_sw/default/{TIME}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png"/>
      <TileMatrixSetLink>
        <TileMatrixSet>swissgrid</TileMatrixSet>
      </TileMatrixSetLink>
    </Layer>

    <Layer>
      <ows:Title>grundkarte_farbig</ows:Title>
      <ows:Identifier>grundkarte_farbig</ows:Identifier>
      <Style isDefault="true">
        <ows:Identifier>default</ows:Identifier>
      </Style>
      <Format>image/png</Format>
      <Dimension>
        <ows:Identifier>TIME</ows:Identifier>
        <Default>9999</Default>
        <Value>9999</Value>
      </Dimension>
      <ResourceURL format="image/png" resourceType="tile" template="https://tile.geoview.bl.ch/1.0.0/grundkarte_farbig/default/{TIME}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png"/>
      <ResourceURL format="image/png" resourceType="tile" template="https://tile1.geoview.bl.ch/1.0.0/grundkarte_farbig/default/{TIME}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png"/>
      <ResourceURL format="image/png" resourceType="tile" template="https://tile2.geoview.bl.ch/1.0.0/grundkarte_farbig/default/{TIME}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png"/>
      <ResourceURL format="image/png" resourceType="tile" template="https://tile3.geoview.bl.ch/1.0.0/grundkarte_farbig/default/{TIME}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png"/>
      <ResourceURL format="image/png" resourceType="tile" template="https://tile4.geoview.bl.ch/1.0.0/grundkarte_farbig/default/{TIME}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png"/>
      <TileMatrixSetLink>
        <TileMatrixSet>swissgrid</TileMatrixSet>
      </TileMatrixSetLink>
    </Layer>

    <Layer>
      <ows:Title>grundkarte_np</ows:Title>
      <ows:Identifier>grundkarte_np</ows:Identifier>
      <Style isDefault="true">
        <ows:Identifier>default</ows:Identifier>
      </Style>
      <Format>image/jpeg</Format>
      <Dimension>
        <ows:Identifier>TIME</ows:Identifier>
        <Default>9999</Default>
        <Value>9999</Value>
      </Dimension>
      <ResourceURL format="image/jpeg" resourceType="tile" template="https://tile.geoview.bl.ch/1.0.0/grundkarte_np/default/{TIME}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg"/>
      <ResourceURL format="image/jpeg" resourceType="tile" template="https://tile1.geoview.bl.ch/1.0.0/grundkarte_np/default/{TIME}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg"/>
      <ResourceURL format="image/jpeg" resourceType="tile" template="https://tile2.geoview.bl.ch/1.0.0/grundkarte_np/default/{TIME}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg"/>
      <ResourceURL format="image/jpeg" resourceType="tile" template="https://tile3.geoview.bl.ch/1.0.0/grundkarte_np/default/{TIME}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg"/>
      <ResourceURL format="image/jpeg" resourceType="tile" template="https://tile4.geoview.bl.ch/1.0.0/grundkarte_np/default/{TIME}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg"/>
      <TileMatrixSetLink>
        <TileMatrixSet>swissgrid</TileMatrixSet>
      </TileMatrixSetLink>
    </Layer>



    <TileMatrixSet>
      <ows:Identifier>swissgrid</ows:Identifier>
      <ows:SupportedCRS>urn:ogc:def:crs:EPSG::2056</ows:SupportedCRS>
      <TileMatrix>
        <ows:Identifier>0</ows:Identifier>
        <ScaleDenominator>14285714.2857</ScaleDenominator>
        <TopLeftCorner>2420000.0 1350000.0</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>1</MatrixWidth>
        <MatrixHeight>1</MatrixHeight>
      </TileMatrix>

      <TileMatrix>
        <ows:Identifier>1</ows:Identifier>
        <ScaleDenominator>13392857.1429</ScaleDenominator>
        <TopLeftCorner>2420000.0 1350000.0</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>1</MatrixWidth>
        <MatrixHeight>1</MatrixHeight>
      </TileMatrix>

      <TileMatrix>
        <ows:Identifier>2</ows:Identifier>
        <ScaleDenominator>12500000.0</ScaleDenominator>
        <TopLeftCorner>2420000.0 1350000.0</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>1</MatrixWidth>
        <MatrixHeight>1</MatrixHeight>
      </TileMatrix>

      <TileMatrix>
        <ows:Identifier>3</ows:Identifier>
        <ScaleDenominator>11607142.8571</ScaleDenominator>
        <TopLeftCorner>2420000.0 1350000.0</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>1</MatrixWidth>
        <MatrixHeight>1</MatrixHeight>
      </TileMatrix>

      <TileMatrix>
        <ows:Identifier>4</ows:Identifier>
        <ScaleDenominator>10714285.7143</ScaleDenominator>
        <TopLeftCorner>2420000.0 1350000.0</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>1</MatrixWidth>
        <MatrixHeight>1</MatrixHeight>
      </TileMatrix>

      <TileMatrix>
        <ows:Identifier>5</ows:Identifier>
        <ScaleDenominator>9821428.57143</ScaleDenominator>
        <TopLeftCorner>2420000.0 1350000.0</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>1</MatrixWidth>
        <MatrixHeight>1</MatrixHeight>
      </TileMatrix>

      <TileMatrix>
        <ows:Identifier>6</ows:Identifier>
        <ScaleDenominator>8928571.42857</ScaleDenominator>
        <TopLeftCorner>2420000.0 1350000.0</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>1</MatrixWidth>
        <MatrixHeight>1</MatrixHeight>
      </TileMatrix>

      <TileMatrix>
        <ows:Identifier>7</ows:Identifier>
        <ScaleDenominator>8035714.28571</ScaleDenominator>
        <TopLeftCorner>2420000.0 1350000.0</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>1</MatrixWidth>
        <MatrixHeight>1</MatrixHeight>
      </TileMatrix>

      <TileMatrix>
        <ows:Identifier>8</ows:Identifier>
        <ScaleDenominator>7142857.14286</ScaleDenominator>
        <TopLeftCorner>2420000.0 1350000.0</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>1</MatrixWidth>
        <MatrixHeight>1</MatrixHeight>
      </TileMatrix>

      <TileMatrix>
        <ows:Identifier>9</ows:Identifier>
        <ScaleDenominator>6250000.0</ScaleDenominator>
        <TopLeftCorner>2420000.0 1350000.0</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>2</MatrixWidth>
        <MatrixHeight>1</MatrixHeight>
      </TileMatrix>

      <TileMatrix>
        <ows:Identifier>10</ows:Identifier>
        <ScaleDenominator>5357142.85714</ScaleDenominator>
        <TopLeftCorner>2420000.0 1350000.0</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>2</MatrixWidth>
        <MatrixHeight>1</MatrixHeight>
      </TileMatrix>

      <TileMatrix>
        <ows:Identifier>11</ows:Identifier>
        <ScaleDenominator>4464285.71429</ScaleDenominator>
        <TopLeftCorner>2420000.0 1350000.0</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>2</MatrixWidth>
        <MatrixHeight>1</MatrixHeight>
      </TileMatrix>

      <TileMatrix>
        <ows:Identifier>12</ows:Identifier>
        <ScaleDenominator>3571428.57143</ScaleDenominator>
        <TopLeftCorner>2420000.0 1350000.0</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>2</MatrixWidth>
        <MatrixHeight>2</MatrixHeight>
      </TileMatrix>

      <TileMatrix>
        <ows:Identifier>13</ows:Identifier>
        <ScaleDenominator>2678571.42857</ScaleDenominator>
        <TopLeftCorner>2420000.0 1350000.0</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>3</MatrixWidth>
        <MatrixHeight>2</MatrixHeight>
      </TileMatrix>

      <TileMatrix>
        <ows:Identifier>14</ows:Identifier>
        <ScaleDenominator>2321428.57143</ScaleDenominator>
        <TopLeftCorner>2420000.0 1350000.0</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>3</MatrixWidth>
        <MatrixHeight>2</MatrixHeight>
      </TileMatrix>

      <TileMatrix>
        <ows:Identifier>15</ows:Identifier>
        <ScaleDenominator>1785714.28571</ScaleDenominator>
        <TopLeftCorner>2420000.0 1350000.0</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>4</MatrixWidth>
        <MatrixHeight>3</MatrixHeight>
      </TileMatrix>

      <TileMatrix>
        <ows:Identifier>16</ows:Identifier>
        <ScaleDenominator>892857.142857</ScaleDenominator>
        <TopLeftCorner>2420000.0 1350000.0</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>8</MatrixWidth>
        <MatrixHeight>5</MatrixHeight>
      </TileMatrix>

      <TileMatrix>
        <ows:Identifier>17</ows:Identifier>
        <ScaleDenominator>357142.857143</ScaleDenominator>
        <TopLeftCorner>2420000.0 1350000.0</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>19</MatrixWidth>
        <MatrixHeight>13</MatrixHeight>
      </TileMatrix>

      <TileMatrix>
        <ows:Identifier>18</ows:Identifier>
        <ScaleDenominator>178571.428571</ScaleDenominator>
        <TopLeftCorner>2420000.0 1350000.0</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>38</MatrixWidth>
        <MatrixHeight>25</MatrixHeight>
      </TileMatrix>

      <TileMatrix>
        <ows:Identifier>19</ows:Identifier>
        <ScaleDenominator>71428.5714286</ScaleDenominator>
        <TopLeftCorner>2420000.0 1350000.0</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>94</MatrixWidth>
        <MatrixHeight>63</MatrixHeight>
      </TileMatrix>

      <TileMatrix>
        <ows:Identifier>20</ows:Identifier>
        <ScaleDenominator>35714.2857143</ScaleDenominator>
        <TopLeftCorner>2420000.0 1350000.0</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>188</MatrixWidth>
        <MatrixHeight>125</MatrixHeight>
      </TileMatrix>

      <TileMatrix>
        <ows:Identifier>21</ows:Identifier>
        <ScaleDenominator>17857.1428571</ScaleDenominator>
        <TopLeftCorner>2420000.0 1350000.0</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>375</MatrixWidth>
        <MatrixHeight>250</MatrixHeight>
      </TileMatrix>

      <TileMatrix>
        <ows:Identifier>22</ows:Identifier>
        <ScaleDenominator>8928.57142857</ScaleDenominator>
        <TopLeftCorner>2420000.0 1350000.0</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>750</MatrixWidth>
        <MatrixHeight>500</MatrixHeight>
      </TileMatrix>

      <TileMatrix>
        <ows:Identifier>23</ows:Identifier>
        <ScaleDenominator>7142.85714286</ScaleDenominator>
        <TopLeftCorner>2420000.0 1350000.0</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>938</MatrixWidth>
        <MatrixHeight>625</MatrixHeight>
      </TileMatrix>

      <TileMatrix>
        <ows:Identifier>24</ows:Identifier>
        <ScaleDenominator>5357.14285714</ScaleDenominator>
        <TopLeftCorner>2420000.0 1350000.0</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>1250</MatrixWidth>
        <MatrixHeight>834</MatrixHeight>
      </TileMatrix>

      <TileMatrix>
        <ows:Identifier>25</ows:Identifier>
        <ScaleDenominator>3571.42857143</ScaleDenominator>
        <TopLeftCorner>2420000.0 1350000.0</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>1875</MatrixWidth>
        <MatrixHeight>1250</MatrixHeight>
      </TileMatrix>

      <TileMatrix>
        <ows:Identifier>26</ows:Identifier>
        <ScaleDenominator>1785.71428571</ScaleDenominator>
        <TopLeftCorner>2420000.0 1350000.0</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>3750</MatrixWidth>
        <MatrixHeight>2500</MatrixHeight>
      </TileMatrix>

      <TileMatrix>
        <ows:Identifier>27</ows:Identifier>
        <ScaleDenominator>892.857142857</ScaleDenominator>
        <TopLeftCorner>2420000.0 1350000.0</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>7500</MatrixWidth>
        <MatrixHeight>5000</MatrixHeight>
      </TileMatrix>

      <TileMatrix>
        <ows:Identifier>28</ows:Identifier>
        <ScaleDenominator>357.142857143</ScaleDenominator>
        <TopLeftCorner>2420000.0 1350000.0</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>18750</MatrixWidth>
        <MatrixHeight>12500</MatrixHeight>
      </TileMatrix>

      <TileMatrix>
        <ows:Identifier>29</ows:Identifier>
        <ScaleDenominator>178.571428571</ScaleDenominator>
        <TopLeftCorner>2420000.0 1350000.0</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>37500</MatrixWidth>
        <MatrixHeight>25000</MatrixHeight>
      </TileMatrix>

      <TileMatrix>
        <ows:Identifier>30</ows:Identifier>
        <ScaleDenominator>89.2857142857</ScaleDenominator>
        <TopLeftCorner>2420000.0 1350000.0</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>75000</MatrixWidth>
        <MatrixHeight>50000</MatrixHeight>
      </TileMatrix>

      <TileMatrix>
        <ows:Identifier>31</ows:Identifier>
        <ScaleDenominator>35.7142857143</ScaleDenominator>
        <TopLeftCorner>2420000.0 1350000.0</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>187500</MatrixWidth>
        <MatrixHeight>125000</MatrixHeight>
      </TileMatrix>

    </TileMatrixSet>

  </Contents>
</Capabilities>`;
