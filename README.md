# mdGridSelect
===========

Functionally same as Grid-Select , but this is more compatible with Material Design.
Basic functionality of select box with the set of divs and fixed header, so that user can scroll through the data alone providing ease of usability.

## Features

 * Implement the grid type structure into the select box
 * Fixed non scrolling header for the result list (Data wise Dynamic)
 * Customizable number of columns in results list.


## Usage

```html
<script src="mdGridSelect.js"></script>
```


## Examples

### Grid Select

```html
<body ng-app="exampleApp">

<div class="container">

    <div ng-controller="mainCtrl">
        <md-grid-select
                  flex="100" id="id"
                  md-items="item in queryData(patientSearchPage)"
                  search-params="patientSearchParams"
                  has-more-results="hasMorePatientsToSearch"
                  md-search-page="patientSearchPage" min-input="3"
                  suggested-param-text="Suggested Search Params"
                  md-placeholder="Placeholder"
                  md-selected-item="selectedPatient"
                  md-selected-item-change="selectedItemChanged()"
                  reset-search-params="clearSearchValue"
                  md-before-open="beforeOpen()"
                  read-only="readOnly"
                  apply-body-width-to-results="true"
                  auto-select-when-one-result="autoSelectWhenOneResult"
                  tooltip="tooltip"
          >
              <md-header-template>
                  <table name="patientWidgetTables" minimum-cell-widths="50,50,50,50,50,50,50,50"
                      class="break-all"
                      style="background: #FAFAFA;color: rgba(0,0,0,0.54); font-size: 12px; font-weight: bold;"
                  >
                      <tbody>
                          <tr>
                              <td>MRN</td>
                              <td>MRN</td>
                              <td>MRN</td>
                              <td>MRN</td>
                              <td>MRN</td>
                              <td>MRN</td>
                              <td>MRN</td>
                              <td>MRN</td>
                              <td>MRN</td>
                          </tr>
                      </tbody>
                  </table>
              </md-header-template>
              <md-results-list-wrapper>
                  <table name="patientWidgetTables" class="break-all" style="color: rgba(0,0,0,0.87); font-size: 13px;">
                      <tbody>
                          <tr md-item-row-repeater>
                              <td>item.mrn</td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                          </tr>
                      </tbody>
                  </table>
              </md-results-list-wrapper>
              <md-selected-item-template>
              <div>
                  <span style="padding-right: 7px;">{{item.firstname}}</span>{{item.lastname}}
              </div>
              </md-selected-item-template>
              <md-not-found>
                  <div layout="row" layout-align="center">No Record Found</div>
              </md-not-found>
          </md-grid-select>
    </div>
</div>

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.0/angular.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.0/angular-route.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.0/angular-sanitize.min.js"></script>

    <script src="mdGridSelect.js"></script>

    <script src="app.js"></script>
</body>
```

## Conceptions

- [ ] Make the Grid Dynamically resizable
- [ ] Make more convenient

## Contributors

* Sankaranandh.T.N

## Dependencies

* Angular JS
* Jquery

