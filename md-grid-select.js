(function () {
    'use strict';

    var mgsApp = angular.module('md-grid-select', ['infinite-scroll']);

    mgsApp.constant('mgsConstant', {
        elementIds: {
            wholeMgsEle: 'wholeMgsElement',
            mgsLoader: 'MgsLoader',
            maskEle: 'MgsMask',
            wrapperEle: 'MgsWrapper',
            resultsGrid: 'MgsResults',
            selectorEle: 'MgsSelector',
            searcherEle: 'MgsSearcher',
            searchParamsEle: 'MgsSearchParams',
            searchNoParamsInput: 'MgsNoParamsSearchInput',
            selectedSearches: 'MgsSelectedSearches',
            suggestedSearches: 'MgsSuggestedSearches',
            suggestedSearchTitle: 'MgsSuggestedSearchTitle',
            searchHasParamsInput: 'MgsHasParamsSearchInput',
            gridHeader: 'MgsGridHeader',
            gridRows: 'MgsGridRows',
            gridRow: 'MgsGridOneRow',
            gridNotFound: 'MgsGridNotFound'
        },
        keyCodes: {
            TAB: 9,
            ESCAPE: 27,
            ENTER: 13,
            DOWN_ARROW: 40,
            UP_ARROW: 38,
            BACKSPACE: 8,
            DELETE: 46
        },
        uniqueElementIds: [],
        gridHeaderTemplate: {}, //The object contents will be {uniqueIdToIdentifyThisInstance: 'string of grid heeader template'}
        mdNotFoundTemplate: {}, //The object contents will be {uniqueIdToIdentifyThisInstance: 'string of md not found template'}
        mdItemsExpression: {}, //The object contents will be {uniqueIdToIdentifyThisInstance: {expression: 'expression part in mdItems', itemName: 'item name part in mdItems'}}
        styleTemplate: '<style>' +
            '.mgs-mask {' +
            '   position: fixed;' +
            '   z-index: 91;' +
            '   top: 0;' +
            '   right: 0;' +
            '   bottom: 0;' +
            '   left: 0;' +
            '   display: none;' +
            '}' +
            '.mgs-wrapper {' +
            '   outline: none;' +
            '   overflow: visible;' +
            '   margin: 8px 5px 15px 5px;' +
            '   cursor: text;' +
            '   position: relative;' +
            '   min-height: 40px;' +
            '   max-height: 40px;' +
            '}' +
            '.mgs-compact .mgs-wrapper {' +
            '   margin: -5px 3px 5px 3px;' +
            '   min-height: 37px;' +
            '   max-height: 37px;' +
            '}' +
            '.mgs-compact .mgs-wrapper:focus {' +
            '   min-height: 37px;' +
            '   max-height: 37px;' +
            '}' +
            '.mgs-compact .mgs-selected-text {' +
            '   margin-top: -7px;' +
            '}' +
            '.mgs-compact .mgs-placeholder {' +
            '   margin-top: -7px;' +
            '   min-height: 37px;' +
            '}' +
            '.no-margin {' +
            '   margin: 0 3px' +
            '}' +
            '.mgs-loader {' +
            '   bottom: 0;' +
            '   left: -1px;' +
            '   position: absolute;' +
            '   width: 100%;' +
            '   display: none;' +
            '}' +
            '.mgs-wrapper.mgs-read-only {' +
            '   cursor: default;' +
            '   pointer-events: none;' +
            '}' +
            '.mgs-wrapper-results-opened {' +
            '   cursor: default;' +
            '   min-height: 40px;' +
            '   max-height: 40px;' +
            '}' +
            '.mgs-wrapper:focus {' +
            '   border-bottom: 2px solid rgb(13,127,163) !important;' +
            '   min-height: 40px;' +
            '   max-height: 40px;' +
            '}' +
            '.mgs-wrapper.mgs-has-value {' +
            '   border-bottom: 1px solid #ccc;' +
            '}' +
            '.mgs-selected-text {' +
            '   height: 100%;' +
            '   margin-top: -4px;' +
            '}' +
            '.mgs-caption {' +
            '   overflow: hidden;' +
            '   text-overflow: ellipsis;' +
            '   white-space: nowrap;' +
            '}' +
            '.mgs-searcher, .mgs-selected-text {' +
            '   z-index: 90;' +
            //'   border-radius: 5px;' +
            '   word-break: break-all;' +
            '}' +
            '.mgs-searcher {' +
            '   border: 1px solid rgb(0,188,212);' +
            '   position: absolute;' +
            '   z-index: 92;' +
            '}' +
            '.mgs-search-params {' +
            '   border-bottom: 1px solid #ccc;' +
            '   min-height: 25px;' +
            '   padding-bottom: 5px;' +
            '   background: white;' +
            '}' +
            '.mgs-results-grid {' +
            '   width: 100%;' +
            '   z-index: 90;' +
            '   background: white;' +
            '   outline: none;' +
            '   position: fixed;' +
            '   top: 0;' +
            '   left: 0;' +
            '   border: 1px solid rgb(0,188,212);' +
            '}' +
            '.mgs-no-params-search md-input-container {' +
            '   margin: 0;' +
            '   padding: 0;' +
            '   width: 100%;' +
            '   height: 100%;' +
            '}' +
            '.mgs-selected-search-param {' +
            '   background: #5bc0de;' +
            '   margin: 0 5px 5px 0;' +
            '   padding: 0 5px;' +
            '   display: inline-block;' +
            '   border-radius: 4px;' +
            '   max-width: 100%;' +
            '}' +
            '.mgs-selected-search-param:hover, .mgs-suggested-search-param .sugsear-title:hover {' +
            '   box-shadow: 0 3px 3px rgba(0,0,0,0.2);' +
            '}' +
            '.mgs-selected-search-param .selsear-title {' +
            '   color: white;' +
            '   margin-right: 3px;' +
            '}' +
            '.mgs-selected-search-param .selsear-title::after {' +
            '   content: \' :\';' +
            '}' +
            '.mgs-selected-search-param .selsear-value {' +
            '   border: 1px solid #ccc;' +
            '   width: 65px;' +
            '   padding: 2px;' +
            '   border-radius: 5px;' +
            '}' +
            '.mgs-suggested-search-param {' +
            '   word-break: break-all;' +
            '}' +
            '.mgs-suggested-search-param .param-label {' +
            '   font-weight: bold;' +
            '   color: grey;' +
            '}' +
            '.mgs-suggested-search-param .sugsear-title {' +
            '   margin: 0 3px 3px 2px;' +
            '   padding: 0 3px;' +
            '   color: white;' +
            '   border-radius: 4px;' +
            '   cursor: pointer;' +
            '   display: inline-block;' +
            '   background-color: #bdbdbd;' +
            '}' +
            '.mgs-grid-rows {' +
            '   overflow: auto;' +
            '   max-height: 200px;' +
            '}' +
            '.mgs-row {' +
            '   cursor: pointer;' +
            '}' +
            '.mgs-grid-rows .mgs-active-row {' +
            '   background: rgb(238,238,238);' +
            '}' +
            '.mgs-selected-searches {' +
            '   padding-top: 5px;' +
            '}' +
            '.mgs-search-closer {' +
            '   cursor: pointer;' +
            '   margin-left: 3px;' +
            '   color: white;' +
            '   font-size: 14px;' +
            '}' +
            '.sugsear-param-caption {' +
            '   background-color: transparent;' +
            '   color: #888;' +
            '   font-weight: 700;' +
            '   padding: 0 5px;' +
            '   font-size: 14px;' +
            '   line-height: 25px;' +
            '}' +
            '.mgs-grid-header {' +
            '   background-color: #bdbdbd;' +
            '   color: white;' +
            '}' +
            '.mgs-placeholder {' +
            '   color: #bdbdbd;' +
            '   font-size: 14px;' +
            //'   position: absolute;' +
            '   bottom: 0px;' +
            '   left: 0;' +
            '   right: auto;' +
            '   transition: transform .4s cubic-bezier(.25,.8,.25,1),-webkit-transform .4s cubic-bezier(.25,.8,.25,1);' +
            '   -webkit-transition: transform .4s cubic-bezier(.25,.8,.25,1),-webkit-transform .4s cubic-bezier(.25,.8,.25,1);' +
            '   cursor: text;' +
            '   outline: none;' +
            '   width: 100%;' +
            '   border-bottom: 1px solid #ccc;' +
            '   min-height: 40px;' +
            '   max-height: 40px;' +
            '   white-space: nowrap;' +
            '   overflow: hidden;' +
            '   text-overflow: ellipsis;' +
            '}' +
            '.mgs-default-search {' +
            '   background: transparent;' +
            '}' +
            '.mgs-default-search .selsear-title {' +
            '   display: none;' +
            '}' +
            '.mgs-default-search .selsear-value {' +
            '   outline: 0;' +
            '}' +
            '.mgs-default-search .mgs-search-closer {' +
            '   color: black;' +
            '}' +
            '.mgs-search-icon {' +
            '   font-size: 14px !important;' +
            '   float: right;' +
            '   text-align: right;' +
            '   margin: 0;' +
            '}' +
            '.mgs-wrapper:focus .mgs-search-label-icon, .mgs-wrapper-results-opened .mgs-search-label-icon {' +
            '   display: none;' +
            '   margin: 0;' +
            '   margin-bottom: -3px;' +
            '}' +
            '.mgs-wrapper:focus .mgs-placeholder, ' +
            '.mgs-wrapper-results-opened .mgs-placeholder, ' +
            '.mgs-has-value.mgs-placeholder {' +
            '   transform: translate3d(-12.5%,-20%,0) scale(0.75) perspective(1px);' +
            '   -webkit-transform: translateX(-12.5%) translateY(-20%) scaleX(0.75) scaleY(0.75) perspective(1px);' +
            '   border-bottom: 0px;' +
            '   width: auto;' +
            '   min-height: 2px;' +
            '   color: #979797;' +
            '}' +
            '.mgs-wrapper:focus .mgs-placeholder, .mgs-wrapper-results-opened .mgs-placeholder {' +
            '   color: rgb(13,127,163);' +
            '}' +
            '</style>',
        defaultMdNotFoundTemplate: '<div layout="row" layout-align="center">No Record Found.</div>',
        defaultMdHeaderTemplate: '<div>No Header Given - Please give header inside tag &lt;md-header-template&gt;&lt;/md-header-template&gt;</div>',
        scrollbarWidth: 0,
        threholdHeightForResultsGrid: 200,
        defaultResultsListPadding: 60,
        parentScopeIdentifier: 'currentScope.',
        defaultSearchDebounce: 100
    });

    mgsApp.factory('mgsUtil', function ($document, $timeout, $window, mgsConstant) {
        var mgsUtil = {};
        var styleTemplateRendered = false;
        var mgsInstanceCount = -1;
        var isMaskAppended = false;
        var resultsListPaddingsById = {};

        mgsUtil.idChanged = function (newId, oldId) {
            var uIdIndex = mgsConstant.uniqueElementIds.indexOf(oldId);
            if (uIdIndex >= 0) {
                mgsConstant.uniqueElementIds.splice(uIdIndex, 1);
            }
            mgsConstant.uniqueElementIds.push(newId);
            mgsConstant.gridHeaderTemplate[newId] = angular.copy(mgsConstant.gridHeaderTemplate[oldId]);
            delete mgsConstant.gridHeaderTemplate[oldId];
            mgsConstant.mdNotFoundTemplate[newId] = angular.copy(mgsConstant.mdNotFoundTemplate[oldId]);
            delete mgsConstant.mdNotFoundTemplate[oldId];
            mgsUtil.searcherTemplatesById[newId] = angular.copy(mgsUtil.searcherTemplatesById[oldId]);
            delete mgsUtil.searcherTemplatesById[oldId];
        };

        mgsUtil.currentlyOpenedInstance = null;

        mgsUtil.setResultsListPaddingFor = function (uniqueId, paddingValue) {
            if (!isNaN(parseInt(paddingValue, 10))) {
                resultsListPaddingsById[uniqueId] = parseInt(paddingValue, 10);
            }
        };

        mgsUtil.getResultsListPadding = function (i) {
            return resultsListPaddingsById[i] || mgsConstant.defaultResultsListPadding;
        };

        mgsUtil.updateScrollbarWidth = function () {
            var inner = document.createElement('p');
            inner.style.width = "100%";
            inner.style.height = "200px";
            var outer = document.createElement('div');
            outer.style.position = "absolute";
            outer.style.top = "0px";
            outer.style.left = "0px";
            outer.style.visibility = "hidden";
            outer.style.width = "200px";
            outer.style.height = "150px";
            outer.style.overflow = "hidden";
            outer.appendChild(inner);
            document.body.appendChild(outer);
            var w1 = inner.offsetWidth;
            outer.style.overflow = 'scroll';
            var w2 = inner.offsetWidth;
            if (w1 === w2) {
                w2 = outer.clientWidth;
            }
            document.body.removeChild(outer);
            mgsConstant.scrollbarWidth = (w1 - w2);
        };

        mgsUtil.getElementFromEvent = function (e) {
            e = e || window.event;
            return e.srcElement || e.target;
        };

        mgsUtil.getIntegerValidatedValue = function (value) {
            var parsedValue = parseInt(value, 10);
            return angular.isNumber(parsedValue) && parsedValue || 0;
        };

        mgsUtil.setMdItemsExpression = function (mdItemsString, uniqueIdOfParticularInstance) {
            var itemParts = mdItemsString.split(/ in /i);
            mgsConstant.mdItemsExpression[uniqueIdOfParticularInstance] = angular.copy(mgsConstant.mdItemsExpression[uniqueIdOfParticularInstance] || {});
            mgsConstant.mdItemsExpression[uniqueIdOfParticularInstance].itemName = angular.copy(itemParts[0]);
            mgsConstant.mdItemsExpression[uniqueIdOfParticularInstance].expression = angular.copy(itemParts[1]);
        };

        mgsUtil.getInnerElementHtmlString = function (element, elementCaption, hasCustomElements) {
            var templateTag = element && element.find(elementCaption) && element.find(elementCaption).detach() || '';
            return templateTag.length ? angular.element(templateTag).html() : '';
        };

        mgsUtil.stopEventPropagation = function (event) {
            event.stopImmediatePropagation();
            event.stopPropagation();
        };

        mgsUtil.focusWrapperEle = function (uniqueId) {
            mgsUtil.focusByElementId(uniqueId + mgsConstant.elementIds.wrapperEle);
        };

        mgsUtil.isElementViewable = function isInView(innerEle, containerEle) {
            if (containerEle && innerEle) {
                var currentVisbleLimitMin = containerEle.prop('scrollTop');
                var currentVisbleLimitMax = containerEle.prop('scrollTop') + containerEle.height();
                var minValueToCheck = innerEle.prop('offsetTop');
                var maxValueToCheck = innerEle.prop('offsetTop') + innerEle.height();
                var isMinValueWithinLimit = minValueToCheck > currentVisbleLimitMin && minValueToCheck < currentVisbleLimitMax;
                var isMaxValueWithinLimit = maxValueToCheck > currentVisbleLimitMin && maxValueToCheck < currentVisbleLimitMax;
                return isMinValueWithinLimit && isMaxValueWithinLimit;
            } else {
                return false;
            }
        };

        mgsUtil.scrollIntoView = function (innerEleId, containerEleId, isToTop, uniqueId) {
            var innerEle = angular.element('#' + uniqueId + innerEleId);
            var containerEle = angular.element('#' + uniqueId + containerEleId);
            if (innerEle && containerEle) {
                if (mgsUtil.isElementViewable(innerEle, containerEle)) {
                    return;
                }
                var innerEleOffsetTop = innerEle.prop('offsetTop');
                var containerEleHeight = containerEle.height();
                var innerEleHeight = innerEle.height();
                if (!!isToTop) {
                    containerEle.prop('scrollTop', innerEleOffsetTop);
                } else {
                    containerEle.prop('scrollTop', innerEleOffsetTop - (containerEleHeight - innerEleHeight));
                }
            }
        };

        mgsUtil.addStyleSheet = function () {
            /*if (styleTemplateRendered) {
                return;
            }
            angular.element('head').append(mgsConstant.styleTemplate);
            styleTemplateRendered = true;*/
        };

        mgsUtil.templateGetters = {};
        mgsUtil.templateGetters.selectorEle = function (element, uniqueId) {
            var t =
                '<span ng-if="!!mdPlaceholder">' +
                '   <span flex class="mgs-placeholder" layout="row" layout-align="space-between end"' +
                '       ng-class="{\'mgs-has-value\': !!hasMdSelectedItem || (!!searchParams && !!showItemTemplateEvenIfNotSelected)}"' +
                '       tabindex="-1">' +
                '           <span ng-class="{mdgridrequired: ngRequired === true }" ng-bind="mdPlaceholder"></span>' +
                '           <md-icon ng-if="!hideSearchIcon && !(!!hasMdSelectedItem || (!!searchParams && !!showItemTemplateEvenIfNotSelected))" md-font-icon="fa fa-search" class="mgs-search-icon mgs-search-label-icon"></md-icon>' +
                '   </span>' +
                '</span>' +
                '<div id="{{id}}' + mgsConstant.elementIds.selectorEle + '" ng-if="!isSearching" class="mgs-selected-text" layout="row" layout-align="space-between center">' +
                '   <div flex class="mgs-caption">' +
                '       <span ng-if="hasMdSelectedItem || (!!searchParams && !!showItemTemplateEvenIfNotSelected)">' +
                '           <span ng-repeat="' + (mgsConstant.mdItemsExpression[uniqueId] && mgsConstant.mdItemsExpression[uniqueId].itemName || '') + ' in [mdSelectedItem]">' +
                '           ' + mgsUtil.getInnerElementHtmlString(element, 'md-selected-item-template') +
                '               <md-tooltip>{{tooltip}}</md-tooltip>'
                '           </span>' +
                '       </span>' +
                '   </div>' +
                '   <md-icon ng-if="!hideSearchIcon && (!!hasMdSelectedItem || (!!searchParams && !!showItemTemplateEvenIfNotSelected))" md-font-icon="fa fa-search" class="mgs-search-icon"></md-icon>' +
                '</div>';
            t = t.replace(new RegExp(mgsConstant.parentScopeIdentifier, 'g'), '$parent.$parent.$parent.');
            return t;
        };
        mgsUtil.templateGetters.searcherInnerEle = function (uniqueId) {
            var hasParamsSearcherElementTemplate =
                '<div id="{{id}}' + mgsConstant.elementIds.selectedSearches + '" class="mgs-selected-searches">' +
                '   <span ng-repeat="s in selectedSearchParams" class="mgs-selected-search-param" ng-class="{\'mgs-default-search\': s.type === \'defaultParam\'}">' +
                '       <span class="selsear-title">{{s.displayTitle}}</span>' +
                '       <input id="{{id}}' + mgsConstant.elementIds.searchHasParamsInput + '{{$index}}"' +
                '            ng-model="s.value"' +
                '            aria-label="{{\'COMMON.SEARCH\' | translate}}"' +
                '            placeholder="{{s.placeholder}}"' +
                '            class="selsear-value" ng-style="{width: (s.width || 65) + \'px\'}" autocomplete="off"' +
                '            ng-change="setSelectedSearchParam($index, s.value)" input-auto-expand' +
                '           />' +
                '       <span ng-click="removeFromSelectedSearchParams($index)" ng-if="(!disableDefaultSearchParam) && (s.type !== \'defaultParam\' || selectedSearchParams.length > 1) || (selectedSearchParams.length > 1)" class="mgs-search-closer">&times;</span>' +
                '   </span>' +
                '</div>' +
                '<div id="{{id}}' + mgsConstant.elementIds.suggestedSearches + '" class="mgs-suggested-search-param">' +
                '   <span class="sugsear-param-caption" ng-bind="suggestedParamText || \'Search Params\'"></span>' +
                '   <span id="{{id}}' + mgsConstant.elementIds.suggestedSearchTitle + '{{$index}}" class="sugsear-title" ng-repeat="sp in suggestedSearchParams" ng-if="!sp.hide" ng-click="addToSelectedSearchParams($index, $event)">{{sp.displayTitle}}</span>' +
                '</div>';

            var noParamsSearcherElementTemplate =
                '<md-input-container md-no-float>' +
                '   <input id="{{id}}' + mgsConstant.elementIds.searchNoParamsInput + '" type="text"' +
                '       ng-model="noParamsSearcher.value"' +
                '       ng-change="setSearchParam(noParamsSearcher.value)"' +
                '       aria-label="{{\'COMMON.SEARCH\' | translate}}"' +
                '       autocomplete="off"/>' +
                '</md-input-container>';
            var searcherElementInnerTemplate =
                '<div ng-if="hasSearchParams">' +
                hasParamsSearcherElementTemplate +
                '</div>' +
                '<div ng-if="!hasSearchParams" class="mgs-no-params-search" flex="100">' +
                noParamsSearcherElementTemplate +
                '</div>';
            return searcherElementInnerTemplate;
        };
        mgsUtil.templateGetters.gridHeader = function (element, uniqueId) {
            mgsConstant.gridHeaderTemplate[uniqueId] = mgsUtil.getInnerElementHtmlString(element, 'md-header-template') || mgsConstant.defaultMdHeaderTemplate;
            return '<div mgs-parent-scope parent-level="1" id="{{id}}' + mgsConstant.elementIds.gridHeader + '" class="mgs-grid-header" ng-style="rowsEleHasScroll && headerScrollPadder" template="gridHeaderTemplate" mgs-id="{{id}}" ng-if="resultsList.length"></div>';
        };
        mgsUtil.templateGetters.gridRows = function getGridRowsTemplate(element, uniqueId) {
            var resultsListWrapper = mgsUtil.getInnerElementHtmlString(element, 'md-results-list-wrapper');
            var itemName = (mgsConstant.mdItemsExpression[uniqueId] && mgsConstant.mdItemsExpression[uniqueId].itemName || '');
            var t = '';
            if (!resultsListWrapper) {
                var itemTemplate = mgsUtil.getInnerElementHtmlString(element, 'md-item-row-template');
                t =
                    '<div id="{{id}}' + mgsConstant.elementIds.gridRows + '" class="mgs-grid-rows"' +
                    '       on-scroll-last="checkAndLoadMoreResults()"' +
                    '       scroll-last-disabled="!hasMoreResults">' +
                    '   <div id="{{id}}' + mgsConstant.elementIds.gridRow + '{{$index}}"' +
                    '           layout="row"' +
                    '           ng-repeat="' + itemName + ' in resultsList"' +
                    '           class="mgs-row"' +
                    '           ng-class="selectedGridRowIndex === $index && \'mgs-active-row\'"' +
                    '           ng-click="doSelectRow($event);"' +
                    '           ng-mouseover="setSelectedGridRowIndexTo($index)"' +
                    '           ng-focus="setSelectedGridRowIndexTo($index)">' +
                    '       ' + itemTemplate +
                    '   </div>' +
                    '</div>';
            } else {
                var repeaterAttributes =
                    ' id="{{id}}' + mgsConstant.elementIds.gridRow + '{{$index}}" ' +
                    ' ng-repeat="' + itemName + ' in resultsList" ' +
                    ' ng-class="selectedGridRowIndex === $index && \'mgs-active-row\'" ' +
                    ' ng-click="doSelectRow($event);" ng-mouseover="setSelectedGridRowIndexTo($index)" ' +
                    ' ng-focus="setSelectedGridRowIndexTo($index)" ';
                t =
                    '<div id="{{id}}' + mgsConstant.elementIds.gridRows + '" class="mgs-grid-rows"' +
                    '       on-scroll-last="checkAndLoadMoreResults()"' +
                    '       class="mgs-row"' +
                    '       scroll-last-disabled="!hasMoreResults">' +
                    '   ' + resultsListWrapper.replace('md-item-row-repeater', repeaterAttributes) +
                    '</div>';
            }
            t = t.replace(new RegExp(mgsConstant.parentScopeIdentifier, 'g'), '$parent.$parent.');
            return t;
        };

        mgsUtil.templateGetters.mdNotFound = function (element, uniqueId) {
            mgsConstant.mdNotFoundTemplate[uniqueId] = mgsUtil.getInnerElementHtmlString(element, 'md-not-found') || mgsConstant.defaultMdNotFoundTemplate;
            return '<div mgs-parent-scope parent-level="1" id="{{id}}' + mgsConstant.elementIds.gridNotFound + '" ng-if="displayNoRecords" class="mgs-grid-notfound" template="mdNotFoundTemplate" mgs-id="{{id}}"></div>';
        };

        mgsUtil.isDescendant = function (parent, child) {
            var node = child.parentNode;
            while (node != null) {
                if (node == parent) {
                    return true;
                }
                node = node.parentNode;
            }
            return false;
        };

        mgsUtil.preventSearcherEleWidthUpdater = false;
        mgsUtil.alignSearcherEle = function (value, uniqueId, updateWrapperEleAlso) {
            var alignerValue = 10;
            $timeout(function () {
                var wrprEle = angular.element('#' + uniqueId + (mgsConstant.elementIds && mgsConstant.elementIds.wrapperEle));
                var srchrEle = angular.element('#' + uniqueId + (mgsConstant.elementIds && mgsConstant.elementIds.searcherEle));
                srchrEle.css('display', 'none');
                /*wrprEle.width('auto');*/
                if (srchrEle != null) {
                    srchrEle.width(!!value && value || wrprEle.width());
                    if (wrprEle != null && wrprEle.offset() != null) {
                        srchrEle.css('top', wrprEle.offset().top + alignerValue + 2);
                        var bodyHeight = angular.element('body').height();
                        if (srchrEle.offset() != null) {
                            if (srchrEle.height() + srchrEle.offset().top > bodyHeight) {
                                srchrEle.css('top', (bodyHeight - srchrEle.height() + alignerValue) + 'px');
                            }
                        }
                        srchrEle.css('left', wrprEle.offset().left);
                        srchrEle.css('display', 'block');
                    }
                }
                /*if(!!updateWrapperEleAlso){
                    wrprEle.width(!!value && value || srchrEle.width());
                }*/
            });
        };

        mgsUtil.getMgsInstanceCount = function () {
            mgsInstanceCount++;
            return mgsInstanceCount;
        };

        mgsUtil.defaultSearchParamObject = {
            displayTitle: 'defaultQuery',
            title: 'query',
            width: 0,
            type: 'defaultParam'
        };

        mgsUtil.searcherTemplatesById = {};

        mgsUtil.appendMgsMask = function () {
            /*if (isMaskAppended) {
                return;
            }
            angular.element('body').append('<div id="' + (mgsConstant.elementIds && mgsConstant.elementIds.maskEle) + '" onclick="this.style.display = \'none\'" class="mgs-mask"></div>');
            isMaskAppended = true;*/
        };
        mgsUtil.showMask = function () {
            // mgsUtil.appendMgsMask();
            angular.element('body').append('<div id="' + (mgsConstant.elementIds && mgsConstant.elementIds.maskEle) + '" onclick="this.style.display = \'none\'" class="mgs-mask"></div>');
            angular.element('#' + (mgsConstant.elementIds && mgsConstant.elementIds.maskEle)).show();
        };
        mgsUtil.hideMask = function () {
            angular.element('#' + (mgsConstant.elementIds && mgsConstant.elementIds.maskEle)).hide();
            angular.element('#' + (mgsConstant.elementIds && mgsConstant.elementIds.maskEle)).remove();
        };

        mgsUtil.alignResultsEle = function (uniqueId, resultsListLength, isFullWidth, isFixedLeft, isFixedRight) {
            $timeout(function () {
                var bodyHeight = angular.element('body').height();

                var spEle = angular.element('#' + uniqueId + (mgsConstant.elementIds && mgsConstant.elementIds.searchParamsEle));
                var searchParamsEleHeight = spEle.height();
                var searchParamsEleTopPosition = spEle.offset();
                if (!searchParamsEleTopPosition) {
                    return;
                }
                searchParamsEleTopPosition = searchParamsEleTopPosition.top;

                var availableTopSpace = angular.copy(searchParamsEleTopPosition) - mgsUtil.getResultsListPadding(uniqueId);
                var availableBottomSpace = bodyHeight - (searchParamsEleTopPosition + searchParamsEleHeight) - mgsUtil.getResultsListPadding(uniqueId);

                var srchrEle = angular.element('#' + uniqueId + (mgsConstant.elementIds && mgsConstant.elementIds.searcherEle));
                var resultsGrid = angular.element('#' + uniqueId + (mgsConstant.elementIds && mgsConstant.elementIds.resultsGrid));
                var gridRowsELe = angular.element('#' + uniqueId + (mgsConstant.elementIds && mgsConstant.elementIds.gridRows))
                var gridHeaderEle = angular.element('#' + uniqueId + (mgsConstant.elementIds && mgsConstant.elementIds.gridHeader));

                $timeout(function () {
                    if (srchrEle.height() + srchrEle.offset().top > bodyHeight) {
                        srchrEle.css('top', (bodyHeight - srchrEle.height() - 2) + 'px');
                    }
                    searchEleAligned();
                });

                function searchEleAligned() {
                    $timeout(function () {
                        if (availableBottomSpace >= mgsConstant.threholdHeightForResultsGrid || availableBottomSpace > availableTopSpace) {
                            gridRowsELe.css('max-height', (availableBottomSpace - gridHeaderEle.height()) + 'px');
                            var t = srchrEle.offset().top + srchrEle.height();
                            resultsGrid.css('top', t + 'px');
                            applyFullWidthToResultsGrid(true, t, availableBottomSpace);
                        } else {
                            gridRowsELe.css('max-height', (
                                availableTopSpace -
                                gridHeaderEle.height() -
                                mgsUtil.getResultsListPadding(uniqueId)
                            ) + 'px');
                            $timeout(function () {
                                var t = srchrEle.offset().top - gridRowsELe.height() - (resultsListLength ? mgsUtil.getResultsListPadding(uniqueId) : 0);
                                resultsGrid.css('top', t + 'px');
                                applyFullWidthToResultsGrid(false, t, availableTopSpace);
                            });
                        }
                    });
                };

                function applyFullWidthToResultsGrid(resultsIsAtBottom, rgTop, availableSpace) {
                    var winWidth = angular.element($window).width();
                    if (isFullWidth) {
                        resultsGrid.css('left', mgsUtil.getResultsListPadding(uniqueId) + 'px');
                        resultsGrid.css('width', (winWidth - (mgsUtil.getResultsListPadding(uniqueId) * 2)) + 'px');
                    } else if (isFixedLeft) {
                        resultsGrid.css('left', (srchrEle.offset().left - 1) + 'px');
                        resultsGrid.css('width', (winWidth - resultsGrid.offset().left - mgsUtil.getResultsListPadding(uniqueId)) + 'px');
                    } else if (isFixedRight) {
                        resultsGrid.css('left', mgsUtil.getResultsListPadding(uniqueId) + 'px');
                        resultsGrid.css('width', (srchrEle.offset().left + srchrEle.outerWidth() - mgsUtil.getResultsListPadding(uniqueId)) + 'px');
                    } else {
                        resultsGrid.css('left', (srchrEle.offset().left - 1) + 'px');
                        resultsGrid.css('width', srchrEle.outerWidth() + 'px');
                    }
                    $timeout(function () {
                        var bottomOverlappingValue = (srchrEle.offset().top + srchrEle.height()) - rgTop;
                        var topOverlappingValue = (rgTop + resultsGrid.height()) - srchrEle.offset().top;
                        if (resultsIsAtBottom && bottomOverlappingValue > 0) {
                            resultsGrid.css('top', (resultsGrid.offset().top + bottomOverlappingValue) + 'px');
                            gridRowsELe.css('max-height', (availableSpace - gridHeaderEle.height()) + 'px');
                        } else if (!resultsIsAtBottom) {
                            if (topOverlappingValue > 0) {
                                resultsGrid.css('top', (resultsGrid.offset().top - topOverlappingValue) + 'px');
                            }
                            gridRowsELe.css('max-height', (availableSpace - gridHeaderEle.height() - (mgsUtil.getResultsListPadding(uniqueId) / 3)) + 'px');
                        }
                        resultsGrid.css('visibility', 'visible');
                    });
                };
            });
        };

        mgsUtil.showLoader = function (uniqueId) {
            angular.element('#' + uniqueId + (mgsConstant.elementIds && mgsConstant.elementIds.mgsLoader)).show();
        };
        mgsUtil.hideLoader = function (uniqueId) {
            angular.element('#' + uniqueId + (mgsConstant.elementIds && mgsConstant.elementIds.mgsLoader)).hide();
        };

        mgsUtil.focusByElementId = function (eleId) {
            angular.element('#' + eleId).focus();
            $timeout(function () {
                if (!angular.element('#' + eleId).is(':focus')) {
                    mgsUtil.focusByElementId(eleId);
                }
            });
        };

        mgsUtil.scrollMGSIntoView = function (uniqueId) {
            var elem = document.getElementById(uniqueId + mgsConstant.elementIds.wrapperEle);
            var bnd = elem.getBoundingClientRect();
            if (bnd.top < 0) {
                elem.scrollIntoView(true);
            } else if (bnd.bottom > window.innerHeight) {
                elem.scrollIntoView(bnd.top <= 0);
            }
        };

        return mgsUtil;
    });

    mgsApp.directive('mdGridSelect', function ($rootScope, $window, $document, $timeout, $compile, $mdUtil, $q, mgsConstant, mgsUtil) {

        function link(scope, elements, attributes, controller) {
            scope.mgsConstant = mgsConstant;
            scope.id = scope.id || attributes.id;
            mgsUtil.addStyleSheet();
            // angular.element('head').append('<style id="hideMgsOnLoad">.mgs-searcher{display:none;}</style>');
            elements.html($compile(templateGetter(elements, attributes, scope))(scope));

            mgsUtil.setResultsListPaddingFor(scope.id, scope.resultsListPadding);

            /*var sEle = angular.element('#' + scope.id + (mgsConstant.elementIds && mgsConstant.elementIds.searcherEle));
            if (!!sEle && !!sEle.length) {
                sEle.remove();
            }
            angular.element('body').append($compile(mgsUtil.searcherTemplatesById[scope.id])(scope));
            $timeout(function () {
                angular.element('#' + scope.id + mgsConstant.elementIds.searcherEle).css('visibility', 'visible');
            }, 1000);*/
            //mgsUtil.appendMgsMask();

            /*$timeout(function () {
                angular.element('#' + scope.id + (mgsConstant.elementIds && mgsConstant.elementIds.searcherEle)).on(
                    'keydown', controller.mgsKeyDownHandler
                );
                //angular.element('#hideMgsOnLoad').remove();
            });*/
            scope.headerScrollPadder = {
                'padding-right': mgsConstant.scrollbarWidth + 'px'
            };
            controller.setUniqueId(scope.id);

            if (!!scope.mdAutofocus) {
                $timeout(function () {
                    mgsUtil.focusWrapperEle(scope.id);
                });
            }

            /*scope.$watch(function () {
                return angular.element('#' + scope.id + (mgsConstant.elementIds && mgsConstant.elementIds.wrapperEle)).width();
            }, function (newVal) {
                if (mgsUtil.preventSearcherEleWidthUpdater) {
                    mgsUtil.preventSearcherEleWidthUpdater = false;
                    return;
                }
                mgsUtil.alignSearcherEle(null, scope.id, false);
                mgsUtil.alignResultsEle(scope.id, scope.resultsList && scope.resultsList.length || 0, scope.applyBodyWidthToResults, scope.extendResultsWithFixedLeft, scope.extendResultsWithFixedRight);
            }, true);*/
        };

        function controller($scope, $element, $timeout, $interval, mgsUtil) {
            var initialSearchParams = null;
            var lastSearchMoment = null;
            $scope.stopEventPropagation = mgsUtil.stopEventPropagation;
            $scope.isSearching = false;
            $scope.hasSearchParams = !!$scope.searchParams && typeof $scope.searchParams === 'object' && JSON.stringify($scope.searchParams) !== '{}';
            $scope.searchDebounce = mgsUtil.getIntegerValidatedValue($scope.searchDebounce) || mgsConstant.defaultSearchDebounce;
            $scope.minInput = mgsUtil.getIntegerValidatedValue($scope.minInput);
            $scope.paramsSearcherTextLength = 0;
            $scope.resultsList = [];
            var uniqueId = '';
            this.setUniqueId = function (u) {
                if (mgsConstant.uniqueElementIds.indexOf(u) > -1) {
                    console.error('Id ' + u + ' is already assigned to some other MdGridSelect element of this page. Hence it will not function correctly.');
                }
                mgsConstant.uniqueElementIds.push(u);
                uniqueId = u;
            };
            $scope.$watch('id', function (newVal, oldVal) {
                if (newVal === oldVal) {
                    return;
                }
                uniqueId = newVal;
                mgsUtil.idChanged(oldVal);
            });

            if ($scope.hasSearchParams) {
                var i = -1;
                $scope.searchParams.forEach(function (sp) {
                    i++;
                    sp.index = angular.copy(i);
                });
                initialSearchParams = angular.copy($scope.searchParams);
                if (!$scope.disableDefaultSearchParam) {
                    $scope.searchParams.unshift(angular.copy(mgsUtil.defaultSearchParamObject));
                }
                $scope.selectedSearchParams = $scope.searchParams.splice(0, 1);
                $scope.suggestedSearchParams = angular.copy($scope.searchParams);
            } else {
                $scope.noParamsSearcher = {
                    value: ''
                };
            }

            /*Setting search param value for hasSearchParam false case*/
            $scope.setSearchParam = function (value) {
                $scope.searchParams = value;
                $scope.mdSearchPage = 1;
                doSearch(true, false);
            };

            /*Setting search param value for hasSearchParam true case*/
            $scope.setSelectedSearchParam = function (index, value) {
                $scope.selectedSearchParams[index].value = value;
                $scope.searchParams = $scope.selectedSearchParams;
                $scope.mdSearchPage = 1;
                doSearch(true, false);
            };

            $scope.addToSelectedSearchParams = function (index, event) {
                if (index < 0 || !event) {
                    return;
                }
                mgsUtil.stopEventPropagation(event);
                $scope.selectedSearchParams.push($scope.suggestedSearchParams.slice(index, index + 1)[0]);
                $scope.suggestedSearchParams[index].hide = true;
                $timeout(function () {
                    mgsUtil.focusByElementId(uniqueId + (mgsConstant.elementIds && mgsConstant.elementIds.searchHasParamsInput || '') + '' + ($scope.selectedSearchParams.length - 1));
                    mgsUtil.alignResultsEle(uniqueId, $scope.resultsList.length, $scope.applyBodyWidthToResults, $scope.extendResultsWithFixedLeft, $scope.extendResultsWithFixedRight);
                });
            };
            $scope.removeFromSelectedSearchParams = function (index) {
                if (index < 0) {
                    return;
                }
                var splicedSelectedParam = $scope.selectedSearchParams.splice(index, 1)[0];
                if (!!splicedSelectedParam.value) {
                    splicedSelectedParam.value = '';
                    updateParamsSearcherTextLength();
                    $timeout(function () {
                        doSearch(true, true);
                    });
                }
                var sspLength = $scope.suggestedSearchParams.length;
                for (var sp = 0; sp < sspLength; sp++) {
                    if ($scope.suggestedSearchParams[sp].index === splicedSelectedParam.index) {
                        $scope.suggestedSearchParams[sp].hide = false;
                        break;
                    }
                }
                if (!$scope.selectedSearchParams.length) {
                    $scope.selectedSearchParams.push(angular.copy(mgsUtil.defaultSearchParamObject));
                }
                $timeout(function () {
                    mgsUtil.alignResultsEle(uniqueId, $scope.resultsList.length, $scope.applyBodyWidthToResults, $scope.extendResultsWithFixedLeft, $scope.extendResultsWithFixedRight);
                });
            };

            function updateParamsSearcherTextLength() {
                $scope.paramsSearcherTextLength = 0;
                for (var sp = 0; sp < $scope.selectedSearchParams.length; sp++) {
                    var currentParamLength = !!$scope.selectedSearchParams[sp] && !!$scope.selectedSearchParams[sp].value && $scope.selectedSearchParams[sp].value.length || 0;
                    $scope.paramsSearcherTextLength = $scope.paramsSearcherTextLength + currentParamLength;
                }
                return true;
            };

            var preventMoreLoading = false;

            function checkMinInput() {
                if (!$scope.hasSearchParams) {
                    $scope.isInputGreaterThanMin = (!!$scope.searchParams && $scope.searchParams.length >= $scope.minInput)
                } else {
                    $scope.isInputGreaterThanMin = (updateParamsSearcherTextLength() && $scope.paramsSearcherTextLength >= $scope.minInput)
                }
                return $scope.isInputGreaterThanMin;
            };

            var searchTimer = null;
            var promiseCount = 0;
            var previouslyProcessedPromiseCount = -1;

            function doSearch(cleanBeforeAppend, searchWithoutDebounce) {
                if (searchWithoutDebounce) {
                    $timeout(function () {
                        if (!checkMinInput()) {
                            mgsUtil.hideLoader(uniqueId);
                            return;
                        }
                        actualSearcher(cleanBeforeAppend);
                    });
                } else {
                    if (!!searchTimer) {
                        $timeout.cancel(searchTimer);
                    }
                    searchTimer = $timeout(function () {
                        searchTimer = null;
                        if (!checkMinInput()) {
                            mgsUtil.hideLoader(uniqueId);
                            return;
                        }
                        actualSearcher(cleanBeforeAppend);
                    }, $scope.searchDebounce);
                }

                function actualSearcher(cleanBeforeAppend) {
                    lastSearchMoment = moment();
                    $scope.displayNoRecords = false;
                    mgsUtil.showLoader(uniqueId);
                    var evaluatedSearchExpression = $scope.$parent.$eval(mgsConstant.mdItemsExpression[uniqueId] && mgsConstant.mdItemsExpression[uniqueId].expression || '');
                    var evaluatedSearchExpressionIsArray = angular.isArray(evaluatedSearchExpression);
                    var evaluatedSearchExpressionIsPromise = !!evaluatedSearchExpression.then;
                    if (evaluatedSearchExpressionIsArray) {
                        if (!!cleanBeforeAppend) {
                            $scope.resultsList = [];
                            $scope.selectedGridRowIndex = 0;
                        }
                        if (checkMinInput()) {
                            $scope.resultsList = $scope.resultsList.concat(evaluatedSearchExpression);
                            updateRowEleHasScroll();
                            preventMoreLoading = false;
                            if ($scope.resultsList.length === 0) {
                                $scope.displayNoRecords = true;
                            }
                        }
                        mgsUtil.alignResultsEle(uniqueId, $scope.resultsList.length, $scope.applyBodyWidthToResults, $scope.extendResultsWithFixedLeft, $scope.extendResultsWithFixedRight);
                        mgsUtil.hideLoader(uniqueId);
                        $scope.checkAndDoAutoSelect();
                    } else if (evaluatedSearchExpressionIsPromise) {
                        promiseCount++;
                        var resultsLengthBefore = $scope.resultsList.length;
                        evaluatedSearchExpression.count = parseInt(JSON.stringify(promiseCount));
                        evaluatedSearchExpression
                            .then(function (resolvedData) {
                                if (evaluatedSearchExpression.count < previouslyProcessedPromiseCount) {
                                    return;
                                }
                                previouslyProcessedPromiseCount = angular.copy(evaluatedSearchExpression.count);
                                if (!!cleanBeforeAppend) {
                                    $scope.selectedGridRowIndex = 0;
                                    $scope.resultsList = [];
                                }
                                $scope.resultsList = angular.isArray(resolvedData) && $scope.resultsList.concat(resolvedData) || $scope.resultsList;
                                updateRowEleHasScroll();
                                if ($scope.resultsList.length === 0) {
                                    $scope.displayNoRecords = true;
                                }
                                promiseProcessed(resultsLengthBefore);
                            }, function () {
                                if (evaluatedSearchExpression.count < previouslyProcessedPromiseCount) {
                                    return;
                                }
                                previouslyProcessedPromiseCount = angular.copy(evaluatedSearchExpression.count);
                                $scope.selectedGridRowIndex = 0;
                                promiseProcessed(resultsLengthBefore);
                            });
                    } else {
                        console.error('md-items expression must either return a promise or array. It is now ' + typeof evaluatedSearchExpression);
                    }

                    function promiseProcessed(resultsLengthBefore) {
                        mgsUtil.hideLoader(uniqueId);
                        preventMoreLoading = false;
                        $scope.checkAndDoAutoSelect();
                        if (resultsLengthBefore !== $scope.resultsList.length || !$scope.resultsList.length) {
                            mgsUtil.alignResultsEle(uniqueId, $scope.resultsList.length, $scope.applyBodyWidthToResults, $scope.extendResultsWithFixedLeft, $scope.extendResultsWithFixedRight);
                        }
                        // check the div has scroll
                        $timeout(function () {
                            var scrollDiv = document.getElementById(uniqueId + mgsConstant.elementIds.gridRows); // DOM element ID for the grid

                            var hasVerticalScrollbar = !!scrollDiv && scrollDiv.scrollHeight > scrollDiv.clientHeight && !(scrollDiv.style.overflow && scrollDiv.style.overflow == 'hidden');

                            if (!!$scope.hasMoreResults && !hasVerticalScrollbar) {
                                $scope.checkAndLoadMoreResults();
                            }
                        });
                    };
                };
            };

            $scope.checkAndDoAutoSelect = function () {
                if (!$scope.autoSelectWhenOneResult) { return; }
                if (($scope.resultsList || []).length !== 1) { return; }
                if (!!$scope.hasMoreResults) { return; } //if more result available then dont perform auto select
                $scope.selectedGridRowIndex = 0;
                $scope.doSelectRow();
            };

            function updateRowEleHasScroll() {
                var div = document.getElementById($scope.id + (mgsConstant.elementIds && mgsConstant.elementIds.gridRows));
                $scope.rowsEleHasScroll = !!div && div.scrollHeight > div.clientHeight || false;
            };

            $scope.mdSearchPage = $scope.mdSearchPage || 1;
            var loadMoreTimer = null;
            $scope.checkAndLoadMoreResults = function() {
                if (!$scope.isSearching) {
                    return;
                }
                if (!!loadMoreTimer) {
                    $timeout.cancel(loadMoreTimer);
                }
                loadMoreTimer = $timeout(function () {
                    loadMoreTimer = null;
                    actualLoadMore();
                }, $scope.searchDebounce);

                function actualLoadMore() {
                    if (preventMoreLoading || !checkMinInput()) {
                        return;
                    }
                    var loadMoreTime = moment();
                    $timeout(function () {
                        if ((lastSearchMoment || moment()).isAfter(loadMoreTime)) {
                            return;
                        }
                        if (!!$scope.hasMoreResults) {
                            preventMoreLoading = true;
                            $scope.mdSearchPage++;
                            mgsUtil.showLoader(uniqueId);
                            $timeout(function () {
                                $scope.$apply();
                                doSearch(false, true);
                            });
                        }
                    }, $scope.searchDebounce);
                };
            };

            $scope.enableSearchMode = function () {
                if (!!$scope.readOnly || !!$scope.readOnlyAttr) {
                    return;
                }
                $scope.displayNoRecords = false;
                if ($scope.isSearching) {
                    return;
                }

                var sEle = angular.element('#' + uniqueId + (mgsConstant.elementIds && mgsConstant.elementIds.searcherEle));
                if (!!sEle && !!sEle.length) {
                    sEle.remove();
                }
                angular.element('body').append($compile(mgsUtil.searcherTemplatesById[uniqueId])($scope));
                $timeout(function () {
                    angular.element('#' + uniqueId + mgsConstant.elementIds.searcherEle).css('visibility', 'visible');

                    if (angular.isFunction($scope.mdBeforeOpen)) {
                        $scope.mdBeforeOpen();
                    };
                    mgsUtil.scrollMGSIntoView(uniqueId);
                    $timeout(function () {
                        $scope.isSearching = true;
                        // angular.element('#' + uniqueId + (mgsConstant.elementIds && mgsConstant.elementIds.searcherEle)).css('display', 'block');
                        // mgsUtil.currentlyOpenedInstance = $scope;
                        angular.element('#' + uniqueId + (mgsConstant.elementIds && mgsConstant.elementIds.resultsGrid)).css('visibility', 'hidden');
                        $timeout(function () {
                            $scope.$apply();
                            if (!$scope.hasSearchParams) {
                                mgsUtil.focusByElementId(uniqueId + (mgsConstant.elementIds && mgsConstant.elementIds.searchNoParamsInput || ''));
                            } else {
                                mgsUtil.focusByElementId(uniqueId + (mgsConstant.elementIds && mgsConstant.elementIds.searchHasParamsInput || '') + '0');
                            }
                            mgsUtil.preventSearcherEleWidthUpdater = true;
                            mgsUtil.alignSearcherEle(null, uniqueId, true);
                            mgsUtil.showMask();
                            $timeout(function () {
                                angular.element('#' + (mgsConstant.elementIds && mgsConstant.elementIds.maskEle)).on('click', function (event) {
                                    angular.element('#' + (mgsConstant.elementIds && mgsConstant.elementIds.maskEle)).off('click');
                                    var targetEle = mgsUtil.getElementFromEvent(event);
                                    if (!mgsUtil.isDescendant($element[0], targetEle)) {
                                        $scope.disableSearchMode();
                                    }
                                });
                            });
                            $scope.mdSearchPage = 1;
                            doSearch(true, true);
                        });
                    });
                }, 10);
            };

            $scope.disableSearchMode = this.disableSearchMode = function () {
                if (!$scope.isSearching) {
                    return;
                }

                $scope.isSearching = false;
                $timeout(function () {
                    $scope.$apply();
                });
                mgsUtil.hideMask();
                if (angular.isFunction($scope.mdOnClose)) {
                    $scope.mdOnClose();
                }
                mgsUtil.focusWrapperEle(uniqueId);
                $scope.resultsList = [];
                var sEle = angular.element('#' + uniqueId + (mgsConstant.elementIds && mgsConstant.elementIds.searcherEle));
                if (!!sEle && !!sEle.length) {
                    sEle.remove();
                }
            };

            $scope.toggleSearchMode = function (event, source) {
                if ($scope.isSearching) {
                    if (event.keyCode === (mgsConstant.keyCodes && mgsConstant.keyCodes.ENTER || '') && $scope.resultsList.length === 0) {
                        return;
                    }
                    $scope.disableSearchMode();
                } else {
                    $scope.enableSearchMode();
                }
            };

            $scope.selectedGridRowIndex = 0;
            $scope.doSelectRow = function (event) {
                if (!!event) {
                    mgsUtil.stopEventPropagation(event);
                }
                $timeout(function () {
                    $scope.$apply(function () {
                        $scope.mdSelectedItem = $scope.resultsList[$scope.selectedGridRowIndex];
                        $scope.disableSearchMode();
                        if (angular.isFunction($scope.mdSelectedItemChange)) {
                            $timeout(function () {
                                $scope.mdSelectedItemChange();
                            });
                        }
                    });
                });
            };
            $scope.incrementSelectedGridRowIndex = function (e) {
                if ($scope.selectedGridRowIndex === $scope.resultsList.length - 1) {
                    return;
                }
                $scope.selectedGridRowIndex++;
                mgsUtil.scrollIntoView((mgsConstant.elementIds && mgsConstant.elementIds.gridRow || '') + $scope.selectedGridRowIndex,
                    (mgsConstant.elementIds && mgsConstant.elementIds.gridRows), e.keyCode === (mgsConstant.keyCodes && mgsConstant.keyCodes.UP_ARROW || ''), uniqueId);
                $timeout(function () {
                    $scope.$apply();
                });
            };
            $scope.decrementSelectedGridRowIndex = function (e) {
                if ($scope.selectedGridRowIndex === 0) {
                    return;
                }
                $scope.selectedGridRowIndex--;
                mgsUtil.scrollIntoView((mgsConstant.elementIds && mgsConstant.elementIds.gridRow || '') + $scope.selectedGridRowIndex,
                    (mgsConstant.elementIds && mgsConstant.elementIds.gridRows || ''), e.keyCode === (mgsConstant.keyCodes && mgsConstant.keyCodes.UP_ARROW || ''), uniqueId);
                $timeout(function () {
                    $scope.$apply();
                });
            };
            $scope.setSelectedGridRowIndexTo = function (i) {
                $scope.selectedGridRowIndex = i;
            };

            this.mgsKeyDownHandler = $scope.mgsKeyDownHandler = function (event) {
                if (!event || !mgsConstant.keyCodes || !mgsConstant.elementIds) {
                    return;
                }
                switch (event.keyCode) {
                    case mgsConstant.keyCodes.ESCAPE:
                        mgsUtil.stopEventPropagation(event);
                        $scope.disableSearchMode();
                        break;
                    case mgsConstant.keyCodes.ENTER:
                        mgsUtil.stopEventPropagation(event);
                        var id = mgsUtil.getElementFromEvent(event);
                        id = !!id && id.id || null;
                        if (!!id && id.indexOf(mgsConstant.elementIds.suggestedSearchTitle) > -1) {
                            break;
                        }
                        if ($scope.isSearching && $scope.selectedGridRowIndex > -1 && $scope.resultsList.length > 0) {
                            $scope.doSelectRow(event);
                        }
                        break;
                    case mgsConstant.keyCodes.DOWN_ARROW:
                        mgsUtil.stopEventPropagation(event);
                        $scope.incrementSelectedGridRowIndex(event);
                        break;
                    case mgsConstant.keyCodes.UP_ARROW:
                        mgsUtil.stopEventPropagation(event);
                        $scope.decrementSelectedGridRowIndex(event);
                        break;
                    case mgsConstant.keyCodes.TAB:
                        mgsUtil.stopEventPropagation(event);
                        var eventEleId = mgsUtil.getElementFromEvent(event).id;
                        if ($scope.suggestedSearchParams != null) {
                            var lastGridRowIsFocused = !!$scope.resultsList.length && eventEleId === uniqueId + mgsConstant.elementIds.gridRow + ($scope.resultsList.length - 1);
                            var lastSuggestedSearchTitleIsFocused = !$scope.resultsList.length && eventEleId === uniqueId + mgsConstant.elementIds.suggestedSearchTitle + ($scope.suggestedSearchParams.length - 1);
                            if (lastGridRowIsFocused || lastSuggestedSearchTitleIsFocused) {
                                event.preventDefault();
                                $scope.disableSearchMode();
                            }
                        }
                }
            };

            $scope.$watch('mdSelectedItem', function (newVal, oldVal) {
                $scope.hasMdSelectedItem = !!newVal && JSON.stringify(newVal) !== '{}';
            });

            $scope.$watch('resetSearchParams', function (newVal) {
                if (!!newVal) {
                    clearSearchParams();
                }
            });
            $scope.$watch('searchParams', function (newVal) {
                if (!newVal) {
                    clearSearchParams();
                }
            });

            function clearSearchParams() {
                if ($scope.hasSearchParams) {
                    $scope.searchParams = angular.copy(initialSearchParams);
                    if (!$scope.disableDefaultSearchParam) {
                        $scope.searchParams.unshift(angular.copy(mgsUtil.defaultSearchParamObject));
                    }
                    $scope.selectedSearchParams = $scope.searchParams.splice(0, 1);
                    $scope.suggestedSearchParams = angular.copy($scope.searchParams);
                    updateParamsSearcherTextLength();
                } else {
                    $scope.searchParams = '';
                    $scope.noParamsSearcher.value = '';
                }
                $scope.resetSearchParams = false;
            };

            $scope.$watch('openSearch', function (newVal, oldVal) {
                if (newVal !== oldVal && !!newVal) {
                    $scope.enableSearchMode();
                    $scope.openSearch = false;
                }
            });

            $scope.$watch('closeSearch', function (newVal, oldVal) {
                if (newVal !== oldVal && !!newVal) {
                    $scope.disableSearchMode();
                    $scope.closeSearch = false;
                }
            });

            $scope.$watch(function () {
                return ($element.attr('read-only') || '').toString();
            }, function (n) {
                $scope.readOnlyAttr = n === 'true';
            });

            $scope.$watch('mdFocusWhen', function (newVal) {
                if (!!newVal) {
                    mgsUtil.scrollMGSIntoView(uniqueId);
                    mgsUtil.focusWrapperEle(uniqueId);
                }
            });

            $element.on('$destroy', function () {
                console.log('element is destroyed');
                $scope.$destroy();
            });

            $scope.$on('$destroy', function (event) {
                if (!!$element && !!$element.length) {
                    $element.remove();
                }
                var wholeMgsEle = [];
                var searcherEle = [];
                var elementsRemoved = false;

                processScopeDestroy();

                function processScopeDestroy() {
                    $scope.disableSearchMode();
                    wholeMgsEle = angular.element('#' + uniqueId + mgsConstant.elementIds.wholeMgsEle);
                    searcherEle = angular.element('#' + uniqueId + mgsConstant.elementIds.searcherEle);
                    checkAndRemoveElements();
                };

                function checkAndRemoveElements() {
                    var maskEle = angular.element('#' + (mgsConstant.elementIds && mgsConstant.elementIds.maskEle));
                    while (maskEle !== null && !!maskEle.length) {
                        maskEle.remove();
                        maskEle = angular.element('#' + (mgsConstant.elementIds && mgsConstant.elementIds.maskEle));
                    }
                    var uIdIndex = mgsConstant.uniqueElementIds.indexOf(uniqueId);
                    if (uIdIndex >= 0) {
                        mgsConstant.uniqueElementIds.splice(uIdIndex, 1);
                    }
                    /*if (wholeMgsEle.length || searcherEle.length) {
                        if (wholeMgsEle.length) {
                            wholeMgsEle.remove();
                        }
                        if (searcherEle.length) {
                            searcherEle.remove();
                        }
                        var uIdIndex = mgsConstant.uniqueElementIds.indexOf(uniqueId);
                        if (uIdIndex >= 0) {
                            mgsConstant.uniqueElementIds.splice(uIdIndex, 1);
                        }
                        elementsRemoved = true;
                    } else {
                        if (elementsRemoved) {
                            return;
                        }
                        $timeout(function () {
                            processScopeDestroy();
                        }, 100);
                    }*/
                };
            });
        };

        var templateGetter = function (element, attr, scope) {
            scope.isSearching = false;
            mgsUtil.updateScrollbarWidth();
            scope.id = scope.id || attr.id;
            scope.id = !!scope.id && scope.id || 'MGSInstance' + mgsUtil.getMgsInstanceCount();
            mgsUtil.setMdItemsExpression(attr.mdItems, scope.id);
            var template = '' +
                '<span id="{{id}}' + mgsConstant.elementIds.wholeMgsEle + '"' +
                '       ng-class="{\'mgs-compact\': !!compactHeight}">' +
                '   <div id="{{id}}' + mgsConstant.elementIds.wrapperEle + '" class="mgs-wrapper"' +
                '           tabindex="0" ng-class="{\'mgs-wrapper-results-opened\': isSearching, ' +
                '                                   \'mgs-read-only\': readOnly || readOnlyAttr, ' +
                '                                   \'mgs-has-value\': !!mdSelectedItem || (!!searchParams && !!showItemTemplateEvenIfNotSelected), ' +
                '                                   \'no-margin\': !!noMargin}"' +
                '           ng-click="toggleSearchMode($event)">' +
                '   ' + mgsUtil.templateGetters.selectorEle(element, scope.id, scope.mdPlaceholder) +
                '   </div>' +
                '</span>';

            mgsUtil.searcherTemplatesById[scope.id] = '' +
                '<div id="{{id}}' + mgsConstant.elementIds.searcherEle + '" class="mgs-searcher">' +
                '   <div id="{{id}}' + mgsConstant.elementIds.searchParamsEle + '" class="mgs-search-params" flex="100" ng-keydown="mgsKeyDownHandler($event)">' +
                '   ' + mgsUtil.templateGetters.searcherInnerEle(scope.id) +
                '   </div>' +
                '   <div id="{{id}}' + mgsConstant.elementIds.mgsLoader + '" class="mgs-loader">' +
                '       <md-progress-linear class="md-inline ng-scope md-cyan-theme" md-mode="indeterminate" aria-valuemin="0" aria-valuemax="100" role="progressbar"><div class="_md-container _md-mode-indeterminate"><div class="_md-dashed"></div><div class="_md-bar _md-bar1"></div><div class="_md-bar _md-bar2"></div></div></md-progress-linear>' +
                '   </div>' +
                '   <div id="{{id}}' + mgsConstant.elementIds.resultsGrid + '" class="mgs-results-grid" ng-if="(resultsList.length || displayNoRecords) && isInputGreaterThanMin">' +
                '   ' + mgsUtil.templateGetters.gridHeader(element, scope.id) +
                '   ' + mgsUtil.templateGetters.gridRows(element, scope.id) +
                '   ' + mgsUtil.templateGetters.mdNotFound(element, scope.id) +
                '   </div>' +
                '</div>';

            return template;
        };

        var isolatedScope = {
            mdItems: '@',
            mdPlaceholder: '@?',
            searchParams: '=',
            searchDebounce: '@',
            minInput: '@',
            mdSelectedItem: '=?',
            suggestedParamText: '@?',
            hasMoreResults: '=',
            mdSearchPage: '=',
            mdOnClose: '&?',
            mdSelectedItemChange: '&?',
            resetSearchParams: '=?',
            disableDefaultSearchParam: '=?',
            openSearch: '=?',
            closeSearch: '=?',
            mdBeforeOpen: '&?',
            readOnly: '=?',
            applyBodyWidthToResults: '=?',
            extendResultsWithFixedLeft: '=?',
            extendResultsWithFixedRight: '=?',
            resultsListPadding: '=?',
            id: '=?',
            showItemTemplateEvenIfNotSelected: '=?',
            mdAutofocus: '=?',
            mdFocusWhen: '=?',
            hideSearchIcon: '=?',
            noMargin: '=?',
            compactHeight: '=?',
            autoSelectWhenOneResult: '=?',
            tooltip: '=?',
            ngRequired: '='
        };

        return {
            restrict: 'E',
            scope: isolatedScope,
            controller: controller,
            link: link
        };
    });

    mgsApp.directive('mgsParentScope', function ($compile, mgsConstant) {
        function link(scope, element, attributes, controller) {
            var parentLevel = parseInt(attributes.parentLevel || 1, 10);
            for (var i = 0; i < parentLevel; i++) {
                scope = scope.$parent;
            }
            var t = mgsConstant[attributes.template] && mgsConstant[attributes.template][attributes.mgsId] || '';
            element.html($compile(t)(scope));
        };

        return {
            restrict: 'A',
            link: link
        };
    });

    mgsApp.directive('onScrollLast', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, e, attrs) {
                function scrollIsAtEnd() {
                    return e.scrollTop() + e.prop('offsetHeight') >= e.prop('scrollHeight') - 300; //If -300 is removed, scroll on last will be triggered only if scroll bar reaches last.
                };

                function applyScroll() {
                    $timeout(function () {
                        if (!scope.$eval(attrs.scrollLastDisabled) && scrollIsAtEnd()) {
                            scope.$apply(attrs.onScrollLast);
                        }
                    });
                };

                scope.$watch(function () { return e.prop('clientHeight'); }, function () {
                    if (e.prop('scrollHeight') <= e.prop('clientHeight')) {
                        applyScroll();
                    }
                }, true);
                e.bind('scroll', applyScroll);
            }
        };
    });
})();
