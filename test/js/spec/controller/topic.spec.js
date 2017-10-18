goog.require('oereb.TopicController');

describe('TopicController', function() {

  beforeEach(angular.mock.module('oereb', function($provide) {
    $provide.constant('oerebApplicationUrl', 'http://example.com');
  }));

  var $controller, $rootScope, ExtractService, oerebEventExtractLoaded;

  beforeEach(inject(function(_$controller_, _$rootScope_, _ExtractService_, _oerebEventExtractLoaded_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    ExtractService = _ExtractService_;
    oerebEventExtractLoaded = _oerebEventExtractLoaded_;
  }));

  var getTopicController = function() {
    return $controller('TopicController', {
      $scope: $rootScope.$new(),
      ExtractService: ExtractService,
      oerebEventExtractLoaded: oerebEventExtractLoaded
    });
  };

  it('should be initialized correctly', function() {
    var controller = getTopicController();
    expect(controller.selectedTheme).toBeUndefined();
  });

  describe('extract loaded event', function() {

    it('should not update the selected theme on empty list', function() {
      spyOn(ExtractService, 'getConcernedThemes').and.returnValue([]);
      var controller = getTopicController();
      $rootScope.$broadcast(oerebEventExtractLoaded);
      expect(controller.selectedTheme).toBeUndefined();
    });

    it('should update the selected theme', function() {
      spyOn(ExtractService, 'getConcernedThemes').and.returnValue([
        {
          Code: 'topic1'
        },
        {
          Code: 'topic2'
        }
      ]);
      var controller = getTopicController();
      $rootScope.$broadcast(oerebEventExtractLoaded);
      $rootScope.$apply();
      expect(controller.selectedTheme).toEqual('topic1');
    });

  });

});