'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _reactDom = require('react-dom');

var ReactDOM = _interopRequireWildcard(_reactDom);

var _rcTable = require('rc-table');

var _rcTable2 = _interopRequireDefault(_rcTable);

var _propTypes = require('prop-types');

var PropTypes = _interopRequireWildcard(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _pagination = require('../pagination');

var _pagination2 = _interopRequireDefault(_pagination);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _spin = require('../spin');

var _spin2 = _interopRequireDefault(_spin);

var _LocaleReceiver = require('../locale-provider/LocaleReceiver');

var _LocaleReceiver2 = _interopRequireDefault(_LocaleReceiver);

var _default = require('../locale-provider/default');

var _default2 = _interopRequireDefault(_default);

var _warning = require('../_util/warning');

var _warning2 = _interopRequireDefault(_warning);

var _filterDropdown = require('./filterDropdown');

var _filterDropdown2 = _interopRequireDefault(_filterDropdown);

var _createStore = require('./createStore');

var _createStore2 = _interopRequireDefault(_createStore);

var _SelectionBox = require('./SelectionBox');

var _SelectionBox2 = _interopRequireDefault(_SelectionBox);

var _SelectionCheckboxAll = require('./SelectionCheckboxAll');

var _SelectionCheckboxAll2 = _interopRequireDefault(_SelectionCheckboxAll);

var _Column = require('./Column');

var _Column2 = _interopRequireDefault(_Column);

var _ColumnGroup = require('./ColumnGroup');

var _ColumnGroup2 = _interopRequireDefault(_ColumnGroup);

var _createBodyRow = require('./createBodyRow');

var _createBodyRow2 = _interopRequireDefault(_createBodyRow);

var _util = require('./util');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};

function noop() {}
function stopPropagation(e) {
    e.stopPropagation();
    if (e.nativeEvent.stopImmediatePropagation) {
        e.nativeEvent.stopImmediatePropagation();
    }
}
function getRowSelection(props) {
    return props.rowSelection || {};
}
var defaultPagination = {
    onChange: noop,
    onShowSizeChange: noop
};
/**
 * Avoid creating new object, so that parent component's shouldComponentUpdate
 * can works appropriately。
 */
var emptyObject = {};

var Table = function (_React$Component) {
    (0, _inherits3['default'])(Table, _React$Component);

    function Table(props) {
        (0, _classCallCheck3['default'])(this, Table);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

        _this.getCheckboxPropsByItem = function (item, index) {
            var rowSelection = getRowSelection(_this.props);
            if (!rowSelection.getCheckboxProps) {
                return {};
            }
            var key = _this.getRecordKey(item, index);
            // Cache checkboxProps
            if (!_this.CheckboxPropsCache[key]) {
                _this.CheckboxPropsCache[key] = rowSelection.getCheckboxProps(item);
            }
            return _this.CheckboxPropsCache[key];
        };
        _this.onRow = function (record, index) {
            var _this$props = _this.props,
                onRow = _this$props.onRow,
                prefixCls = _this$props.prefixCls;

            var custom = onRow ? onRow(record, index) : {};
            return (0, _extends5['default'])({}, custom, { prefixCls: prefixCls, store: _this.store, rowKey: _this.getRecordKey(record, index) });
        };
        _this.handleFilter = function (column, nextFilters) {
            var props = _this.props;
            var pagination = (0, _extends5['default'])({}, _this.state.pagination);
            var filters = (0, _extends5['default'])({}, _this.state.filters, (0, _defineProperty3['default'])({}, _this.getColumnKey(column), nextFilters));
            // Remove filters not in current columns
            var currentColumnKeys = [];
            (0, _util.treeMap)(_this.columns, function (c) {
                if (!c.children) {
                    currentColumnKeys.push(_this.getColumnKey(c));
                }
            });
            Object.keys(filters).forEach(function (columnKey) {
                if (currentColumnKeys.indexOf(columnKey) < 0) {
                    delete filters[columnKey];
                }
            });
            if (props.pagination) {
                // Reset current prop
                pagination.current = 1;
                pagination.onChange(pagination.current);
            }
            var newState = {
                pagination: pagination,
                filters: {}
            };
            var filtersToSetState = (0, _extends5['default'])({}, filters);
            // Remove filters which is controlled
            _this.getFilteredValueColumns().forEach(function (col) {
                var columnKey = _this.getColumnKey(col);
                if (columnKey) {
                    delete filtersToSetState[columnKey];
                }
            });
            if (Object.keys(filtersToSetState).length > 0) {
                newState.filters = filtersToSetState;
            }
            // Controlled current prop will not respond user interaction
            if ((0, _typeof3['default'])(props.pagination) === 'object' && 'current' in props.pagination) {
                newState.pagination = (0, _extends5['default'])({}, pagination, { current: _this.state.pagination.current });
            }
            _this.setState(newState, function () {
                _this.store.setState({
                    selectionDirty: false
                });
                var onChange = _this.props.onChange;

                if (onChange) {
                    onChange.apply(null, _this.prepareParamsArguments((0, _extends5['default'])({}, _this.state, { selectionDirty: false, filters: filters,
                        pagination: pagination })));
                }
            });
        };
        _this.handleSelect = function (record, rowIndex, e) {
            var checked = e.target.checked;
            var nativeEvent = e.nativeEvent;
            var defaultSelection = _this.store.getState().selectionDirty ? [] : _this.getDefaultSelection();
            var selectedRowKeys = _this.store.getState().selectedRowKeys.concat(defaultSelection);
            var key = _this.getRecordKey(record, rowIndex);
            var pivot = _this.state.pivot;

            var rows = _this.getFlatCurrentPageData();
            var realIndex = rowIndex;
            if (_this.props.expandedRowRender) {
                realIndex = rows.findIndex(function (row) {
                    return _this.getRecordKey(row, rowIndex) === key;
                });
            }
            if (nativeEvent.shiftKey && pivot !== undefined && realIndex !== pivot) {
                var changeRowKeys = [];
                var direction = Math.sign(pivot - realIndex);
                var dist = Math.abs(pivot - realIndex);
                var step = 0;

                var _loop = function _loop() {
                    var i = realIndex + step * direction;
                    step += 1;
                    var row = rows[i];
                    var rowKey = _this.getRecordKey(row, i);
                    var checkboxProps = _this.getCheckboxPropsByItem(row, i);
                    if (!checkboxProps.disabled) {
                        if (selectedRowKeys.includes(rowKey)) {
                            if (!checked) {
                                selectedRowKeys = selectedRowKeys.filter(function (j) {
                                    return rowKey !== j;
                                });
                                changeRowKeys.push(rowKey);
                            }
                        } else if (checked) {
                            selectedRowKeys.push(rowKey);
                            changeRowKeys.push(rowKey);
                        }
                    }
                };

                while (step <= dist) {
                    _loop();
                }
                _this.setState({ pivot: realIndex });
                _this.store.setState({
                    selectionDirty: true
                });
                _this.setSelectedRowKeys(selectedRowKeys, {
                    selectWay: 'onSelectMultiple',
                    record: record,
                    checked: checked,
                    changeRowKeys: changeRowKeys,
                    nativeEvent: nativeEvent
                });
            } else {
                if (checked) {
                    selectedRowKeys.push(_this.getRecordKey(record, realIndex));
                } else {
                    selectedRowKeys = selectedRowKeys.filter(function (i) {
                        return key !== i;
                    });
                }
                _this.setState({ pivot: realIndex });
                _this.store.setState({
                    selectionDirty: true
                });
                _this.setSelectedRowKeys(selectedRowKeys, {
                    selectWay: 'onSelect',
                    record: record,
                    checked: checked,
                    changeRowKeys: void 0,
                    nativeEvent: nativeEvent
                });
            }
        };
        _this.handleRadioSelect = function (record, rowIndex, e) {
            var checked = e.target.checked;
            var nativeEvent = e.nativeEvent;
            var defaultSelection = _this.store.getState().selectionDirty ? [] : _this.getDefaultSelection();
            var selectedRowKeys = _this.store.getState().selectedRowKeys.concat(defaultSelection);
            var key = _this.getRecordKey(record, rowIndex);
            selectedRowKeys = [key];
            _this.store.setState({
                selectionDirty: true
            });
            _this.setSelectedRowKeys(selectedRowKeys, {
                selectWay: 'onSelect',
                record: record,
                checked: checked,
                changeRowKeys: void 0,
                nativeEvent: nativeEvent
            });
        };
        _this.handleSelectRow = function (selectionKey, index, onSelectFunc) {
            var data = _this.getFlatCurrentPageData();
            var defaultSelection = _this.store.getState().selectionDirty ? [] : _this.getDefaultSelection();
            var selectedRowKeys = _this.store.getState().selectedRowKeys.concat(defaultSelection);
            var changeableRowKeys = data.filter(function (item, i) {
                return !_this.getCheckboxPropsByItem(item, i).disabled;
            }).map(function (item, i) {
                return _this.getRecordKey(item, i);
            });
            var changeRowKeys = [];
            var selectWay = 'onSelectAll';
            var checked = void 0;
            // handle default selection
            switch (selectionKey) {
                case 'all':
                    changeableRowKeys.forEach(function (key) {
                        if (selectedRowKeys.indexOf(key) < 0) {
                            selectedRowKeys.push(key);
                            changeRowKeys.push(key);
                        }
                    });
                    selectWay = 'onSelectAll';
                    checked = true;
                    break;
                case 'removeAll':
                    changeableRowKeys.forEach(function (key) {
                        if (selectedRowKeys.indexOf(key) >= 0) {
                            selectedRowKeys.splice(selectedRowKeys.indexOf(key), 1);
                            changeRowKeys.push(key);
                        }
                    });
                    selectWay = 'onSelectAll';
                    checked = false;
                    break;
                case 'invert':
                    changeableRowKeys.forEach(function (key) {
                        if (selectedRowKeys.indexOf(key) < 0) {
                            selectedRowKeys.push(key);
                        } else {
                            selectedRowKeys.splice(selectedRowKeys.indexOf(key), 1);
                        }
                        changeRowKeys.push(key);
                        selectWay = 'onSelectInvert';
                    });
                    break;
                default:
                    break;
            }
            _this.store.setState({
                selectionDirty: true
            });
            // when select custom selection, callback selections[n].onSelect
            var rowSelection = _this.props.rowSelection;

            var customSelectionStartIndex = 2;
            if (rowSelection && rowSelection.hideDefaultSelections) {
                customSelectionStartIndex = 0;
            }
            if (index >= customSelectionStartIndex && typeof onSelectFunc === 'function') {
                return onSelectFunc(changeableRowKeys);
            }
            _this.setSelectedRowKeys(selectedRowKeys, {
                selectWay: selectWay,
                checked: checked,
                changeRowKeys: changeRowKeys
            });
        };
        _this.handlePageChange = function (current) {
            for (var _len = arguments.length, otherArguments = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                otherArguments[_key - 1] = arguments[_key];
            }

            var props = _this.props;
            var pagination = (0, _extends5['default'])({}, _this.state.pagination);
            if (current) {
                pagination.current = current;
            } else {
                pagination.current = pagination.current || 1;
            }
            pagination.onChange.apply(pagination, [pagination.current].concat(otherArguments));
            var newState = {
                pagination: pagination
            };
            // Controlled current prop will not respond user interaction
            if (props.pagination && (0, _typeof3['default'])(props.pagination) === 'object' && 'current' in props.pagination) {
                newState.pagination = (0, _extends5['default'])({}, pagination, { current: _this.state.pagination.current });
            }
            _this.setState(newState);
            _this.store.setState({
                selectionDirty: false
            });
            var onChange = _this.props.onChange;

            if (onChange) {
                onChange.apply(null, _this.prepareParamsArguments((0, _extends5['default'])({}, _this.state, { selectionDirty: false, pagination: pagination })));
            }
        };
        _this.renderSelectionBox = function (type) {
            return function (_, record, index) {
                var rowKey = _this.getRecordKey(record, index);
                var props = _this.getCheckboxPropsByItem(record, index);
                var handleChange = function handleChange(e) {
                    type === 'radio' ? _this.handleRadioSelect(record, index, e) : _this.handleSelect(record, index, e);
                };
                return React.createElement(
                    'span',
                    { onClick: stopPropagation },
                    React.createElement(_SelectionBox2['default'], (0, _extends5['default'])({ type: type, store: _this.store, rowIndex: rowKey, onChange: handleChange, defaultSelection: _this.getDefaultSelection() }, props))
                );
            };
        };
        _this.getRecordKey = function (record, index) {
            var rowKey = _this.props.rowKey;

            var recordKey = typeof rowKey === 'function' ? rowKey(record, index) : record[rowKey];
            (0, _warning2['default'])(recordKey !== undefined, 'Each record in dataSource of table should have a unique `key` prop, ' + 'or set `rowKey` of Table to an unique primary key, ' + 'see https://u.ant.design/table-row-key');
            return recordKey === undefined ? index : recordKey;
        };
        _this.getPopupContainer = function () {
            return ReactDOM.findDOMNode(_this);
        };
        _this.handleShowSizeChange = function (current, pageSize) {
            var pagination = _this.state.pagination;

            pagination.onShowSizeChange(current, pageSize);
            var nextPagination = (0, _extends5['default'])({}, pagination, { pageSize: pageSize,
                current: current });
            _this.setState({ pagination: nextPagination });
            var onChange = _this.props.onChange;

            if (onChange) {
                onChange.apply(null, _this.prepareParamsArguments((0, _extends5['default'])({}, _this.state, { pagination: nextPagination })));
            }
        };
        _this.renderTable = function (contextLocale, loading) {
            var _classNames;

            var locale = (0, _extends5['default'])({}, contextLocale, _this.props.locale);
            var _a = _this.props,
                style = _a.style,
                className = _a.className,
                prefixCls = _a.prefixCls,
                showHeader = _a.showHeader,
                restProps = __rest(_a, ["style", "className", "prefixCls", "showHeader"]);
            var data = _this.getCurrentPageData();
            var expandIconAsCell = _this.props.expandedRowRender && _this.props.expandIconAsCell !== false;
            var classString = (0, _classnames2['default'])((_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-' + _this.props.size, true), (0, _defineProperty3['default'])(_classNames, prefixCls + '-bordered', _this.props.bordered), (0, _defineProperty3['default'])(_classNames, prefixCls + '-empty', !data.length), (0, _defineProperty3['default'])(_classNames, prefixCls + '-without-column-header', !showHeader), _classNames));
            var columns = _this.renderRowSelection(locale);
            columns = _this.renderColumnsDropdown(columns, locale);
            columns = columns.map(function (column, i) {
                var newColumn = (0, _extends5['default'])({}, column);
                newColumn.key = _this.getColumnKey(newColumn, i);
                return newColumn;
            });
            var expandIconColumnIndex = columns[0] && columns[0].key === 'selection-column' ? 1 : 0;
            if ('expandIconColumnIndex' in restProps) {
                expandIconColumnIndex = restProps.expandIconColumnIndex;
            }
            return React.createElement(_rcTable2['default'], (0, _extends5['default'])({ key: 'table' }, restProps, { onRow: _this.onRow, components: _this.components, prefixCls: prefixCls, data: data, columns: columns, showHeader: showHeader, className: classString, expandIconColumnIndex: expandIconColumnIndex, expandIconAsCell: expandIconAsCell, emptyText: !loading.spinning && locale.emptyText }));
        };
        (0, _warning2['default'])(!('columnsPageRange' in props || 'columnsPageSize' in props), '`columnsPageRange` and `columnsPageSize` are removed, please use ' + 'fixed columns instead, see: https://u.ant.design/fixed-columns.');
        _this.columns = props.columns || (0, _util.normalizeColumns)(props.children);
        _this.createComponents(props.components);
        _this.state = (0, _extends5['default'])({}, _this.getDefaultSortOrder(_this.columns), {
            // 减少状态
            filters: _this.getFiltersFromColumns(), pagination: _this.getDefaultPagination(props), pivot: undefined });
        _this.CheckboxPropsCache = {};
        _this.store = (0, _createStore2['default'])({
            selectedRowKeys: getRowSelection(props).selectedRowKeys || [],
            selectionDirty: false
        });
        return _this;
    }

    (0, _createClass3['default'])(Table, [{
        key: 'getDefaultSelection',
        value: function getDefaultSelection() {
            var _this2 = this;

            var rowSelection = getRowSelection(this.props);
            if (!rowSelection.getCheckboxProps) {
                return [];
            }
            return this.getFlatData().filter(function (item, rowIndex) {
                return _this2.getCheckboxPropsByItem(item, rowIndex).defaultChecked;
            }).map(function (record, rowIndex) {
                return _this2.getRecordKey(record, rowIndex);
            });
        }
    }, {
        key: 'getDefaultPagination',
        value: function getDefaultPagination(props) {
            var pagination = props.pagination || {};
            return this.hasPagination(props) ? (0, _extends5['default'])({}, defaultPagination, pagination, { current: pagination.defaultCurrent || pagination.current || 1, pageSize: pagination.defaultPageSize || pagination.pageSize || 10 }) : {};
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.columns = nextProps.columns || (0, _util.normalizeColumns)(nextProps.children);
            if ('pagination' in nextProps || 'pagination' in this.props) {
                this.setState(function (previousState) {
                    var newPagination = (0, _extends5['default'])({}, defaultPagination, previousState.pagination, nextProps.pagination);
                    newPagination.current = newPagination.current || 1;
                    newPagination.pageSize = newPagination.pageSize || 10;
                    return { pagination: nextProps.pagination !== false ? newPagination : emptyObject };
                });
            }
            if (nextProps.rowSelection && 'selectedRowKeys' in nextProps.rowSelection) {
                this.store.setState({
                    selectedRowKeys: nextProps.rowSelection.selectedRowKeys || []
                });
            }
            if ('dataSource' in nextProps && nextProps.dataSource !== this.props.dataSource) {
                this.store.setState({
                    selectionDirty: false
                });
            }
            // https://github.com/ant-design/ant-design/issues/10133
            this.CheckboxPropsCache = {};
            if (this.getSortOrderColumns(this.columns).length > 0) {
                var sortState = this.getSortStateFromColumns(this.columns);
                if (sortState.sortColumn !== this.state.sortColumn || sortState.sortOrder !== this.state.sortOrder) {
                    this.setState(sortState);
                }
            }
            var filteredValueColumns = this.getFilteredValueColumns(this.columns);
            if (filteredValueColumns.length > 0) {
                var filtersFromColumns = this.getFiltersFromColumns(this.columns);
                var newFilters = (0, _extends5['default'])({}, this.state.filters);
                Object.keys(filtersFromColumns).forEach(function (key) {
                    newFilters[key] = filtersFromColumns[key];
                });
                if (this.isFiltersChanged(newFilters)) {
                    this.setState({ filters: newFilters });
                }
            }
            this.createComponents(nextProps.components, this.props.components);
        }
    }, {
        key: 'setSelectedRowKeys',
        value: function setSelectedRowKeys(selectedRowKeys, selectionInfo) {
            var _this3 = this;

            var selectWay = selectionInfo.selectWay,
                record = selectionInfo.record,
                checked = selectionInfo.checked,
                changeRowKeys = selectionInfo.changeRowKeys,
                nativeEvent = selectionInfo.nativeEvent;

            var rowSelection = getRowSelection(this.props);
            if (rowSelection && !('selectedRowKeys' in rowSelection)) {
                this.store.setState({ selectedRowKeys: selectedRowKeys });
            }
            var data = this.getFlatData();
            if (!rowSelection.onChange && !rowSelection[selectWay]) {
                return;
            }
            var selectedRows = data.filter(function (row, i) {
                return selectedRowKeys.indexOf(_this3.getRecordKey(row, i)) >= 0;
            });
            if (rowSelection.onChange) {
                rowSelection.onChange(selectedRowKeys, selectedRows);
            }
            if (selectWay === 'onSelect' && rowSelection.onSelect) {
                rowSelection.onSelect(record, checked, selectedRows, nativeEvent);
            } else if (selectWay === 'onSelectMultiple' && rowSelection.onSelectMultiple) {
                var changeRows = data.filter(function (row, i) {
                    return changeRowKeys.indexOf(_this3.getRecordKey(row, i)) >= 0;
                });
                rowSelection.onSelectMultiple(checked, selectedRows, changeRows);
            } else if (selectWay === 'onSelectAll' && rowSelection.onSelectAll) {
                var _changeRows = data.filter(function (row, i) {
                    return changeRowKeys.indexOf(_this3.getRecordKey(row, i)) >= 0;
                });
                rowSelection.onSelectAll(checked, selectedRows, _changeRows);
            } else if (selectWay === 'onSelectInvert' && rowSelection.onSelectInvert) {
                rowSelection.onSelectInvert(selectedRowKeys);
            }
        }
    }, {
        key: 'hasPagination',
        value: function hasPagination(props) {
            return (props || this.props).pagination !== false;
        }
    }, {
        key: 'isFiltersChanged',
        value: function isFiltersChanged(filters) {
            var _this4 = this;

            var filtersChanged = false;
            if (Object.keys(filters).length !== Object.keys(this.state.filters).length) {
                filtersChanged = true;
            } else {
                Object.keys(filters).forEach(function (columnKey) {
                    if (filters[columnKey] !== _this4.state.filters[columnKey]) {
                        filtersChanged = true;
                    }
                });
            }
            return filtersChanged;
        }
    }, {
        key: 'getSortOrderColumns',
        value: function getSortOrderColumns(columns) {
            return (0, _util.flatFilter)(columns || this.columns || [], function (column) {
                return 'sortOrder' in column;
            });
        }
    }, {
        key: 'getFilteredValueColumns',
        value: function getFilteredValueColumns(columns) {
            return (0, _util.flatFilter)(columns || this.columns || [], function (column) {
                return typeof column.filteredValue !== 'undefined';
            });
        }
    }, {
        key: 'getFiltersFromColumns',
        value: function getFiltersFromColumns(columns) {
            var _this5 = this;

            var filters = {};
            this.getFilteredValueColumns(columns).forEach(function (col) {
                var colKey = _this5.getColumnKey(col);
                filters[colKey] = col.filteredValue;
            });
            return filters;
        }
    }, {
        key: 'getDefaultSortOrder',
        value: function getDefaultSortOrder(columns) {
            var definedSortState = this.getSortStateFromColumns(columns);
            var defaultSortedColumn = (0, _util.flatFilter)(columns || [], function (column) {
                return column.defaultSortOrder != null;
            })[0];
            if (defaultSortedColumn && !definedSortState.sortColumn) {
                return {
                    sortColumn: defaultSortedColumn,
                    sortOrder: defaultSortedColumn.defaultSortOrder
                };
            }
            return definedSortState;
        }
    }, {
        key: 'getSortStateFromColumns',
        value: function getSortStateFromColumns(columns) {
            // return first column which sortOrder is not falsy
            var sortedColumn = this.getSortOrderColumns(columns).filter(function (col) {
                return col.sortOrder;
            })[0];
            if (sortedColumn) {
                return {
                    sortColumn: sortedColumn,
                    sortOrder: sortedColumn.sortOrder
                };
            }
            return {
                sortColumn: null,
                sortOrder: null
            };
        }
    }, {
        key: 'getSorterFn',
        value: function getSorterFn(state) {
            var _ref = state || this.state,
                sortOrder = _ref.sortOrder,
                sortColumn = _ref.sortColumn;

            if (!sortOrder || !sortColumn || typeof sortColumn.sorter !== 'function') {
                return;
            }
            return function (a, b) {
                var result = sortColumn.sorter(a, b, sortOrder);
                if (result !== 0) {
                    return sortOrder === 'descend' ? -result : result;
                }
                return 0;
            };
        }
    }, {
        key: 'isSameColumn',
        value: function isSameColumn(a, b) {
            if (a && b && a.key && a.key === b.key) {
                return true;
            }
            return a === b || (0, _shallowequal2['default'])(a, b, function (value, other) {
                if (typeof value === 'function' && typeof other === 'function') {
                    return value === other || value.toString() === other.toString();
                }
            });
        }
    }, {
        key: 'toggleSortOrder',
        value: function toggleSortOrder(column) {
            if (!column.sorter) {
                return;
            }
            var _state = this.state,
                sortOrder = _state.sortOrder,
                sortColumn = _state.sortColumn;
            // 只同时允许一列进行排序，否则会导致排序顺序的逻辑问题

            var newSortOrder = void 0;
            // 切换另一列时，丢弃 sortOrder 的状态
            var oldSortOrder = this.isSameColumn(sortColumn, column) ? sortOrder : undefined;
            // 切换排序状态，按照降序/升序/不排序的顺序
            if (!oldSortOrder) {
                newSortOrder = 'ascend';
            } else if (oldSortOrder === 'ascend') {
                newSortOrder = 'descend';
            } else {
                newSortOrder = undefined;
            }
            var newState = {
                sortOrder: newSortOrder,
                sortColumn: newSortOrder ? column : null
            };
            // Controlled
            if (this.getSortOrderColumns().length === 0) {
                this.setState(newState);
            }
            var onChange = this.props.onChange;

            if (onChange) {
                onChange.apply(null, this.prepareParamsArguments((0, _extends5['default'])({}, this.state, newState)));
            }
        }
    }, {
        key: 'renderRowSelection',
        value: function renderRowSelection(locale) {
            var _this6 = this;

            var _props = this.props,
                prefixCls = _props.prefixCls,
                rowSelection = _props.rowSelection;

            var columns = this.columns.concat();
            if (rowSelection) {
                var data = this.getFlatCurrentPageData().filter(function (item, index) {
                    if (rowSelection.getCheckboxProps) {
                        return !_this6.getCheckboxPropsByItem(item, index).disabled;
                    }
                    return true;
                });
                var selectionColumnClass = (0, _classnames2['default'])(prefixCls + '-selection-column', (0, _defineProperty3['default'])({}, prefixCls + '-selection-column-custom', rowSelection.selections));
                var selectionColumn = {
                    key: 'selection-column',
                    render: this.renderSelectionBox(rowSelection.type),
                    className: selectionColumnClass,
                    fixed: rowSelection.fixed,
                    width: rowSelection.columnWidth,
                    title: rowSelection.columnTitle
                };
                if (rowSelection.type !== 'radio') {
                    var checkboxAllDisabled = data.every(function (item, index) {
                        return _this6.getCheckboxPropsByItem(item, index).disabled;
                    });
                    selectionColumn.title = selectionColumn.title || React.createElement(_SelectionCheckboxAll2['default'], { store: this.store, locale: locale, data: data, getCheckboxPropsByItem: this.getCheckboxPropsByItem, getRecordKey: this.getRecordKey, disabled: checkboxAllDisabled, prefixCls: prefixCls, onSelect: this.handleSelectRow, selections: rowSelection.selections, hideDefaultSelections: rowSelection.hideDefaultSelections, getPopupContainer: this.getPopupContainer });
                }
                if ('fixed' in rowSelection) {
                    selectionColumn.fixed = rowSelection.fixed;
                } else if (columns.some(function (column) {
                    return column.fixed === 'left' || column.fixed === true;
                })) {
                    selectionColumn.fixed = 'left';
                }
                if (columns[0] && columns[0].key === 'selection-column') {
                    columns[0] = selectionColumn;
                } else {
                    columns.unshift(selectionColumn);
                }
            }
            return columns;
        }
    }, {
        key: 'getColumnKey',
        value: function getColumnKey(column, index) {
            return column.key || column.dataIndex || index;
        }
    }, {
        key: 'getMaxCurrent',
        value: function getMaxCurrent(total) {
            var _state$pagination = this.state.pagination,
                current = _state$pagination.current,
                pageSize = _state$pagination.pageSize;

            if ((current - 1) * pageSize >= total) {
                return Math.floor((total - 1) / pageSize) + 1;
            }
            return current;
        }
    }, {
        key: 'isSortColumn',
        value: function isSortColumn(column) {
            var sortColumn = this.state.sortColumn;

            if (!column || !sortColumn) {
                return false;
            }
            return this.getColumnKey(sortColumn) === this.getColumnKey(column);
        }
    }, {
        key: 'renderColumnsDropdown',
        value: function renderColumnsDropdown(columns, locale) {
            var _this7 = this;

            var _props2 = this.props,
                prefixCls = _props2.prefixCls,
                dropdownPrefixCls = _props2.dropdownPrefixCls;
            var _state2 = this.state,
                sortOrder = _state2.sortOrder,
                filters = _state2.filters;

            return (0, _util.treeMap)(columns, function (column, i) {
                var _classNames3;

                var key = _this7.getColumnKey(column, i);
                var filterDropdown = void 0;
                var sortButton = void 0;
                var isSortColumn = _this7.isSortColumn(column);
                if (column.filters && column.filters.length > 0 || column.filterDropdown) {
                    var colFilters = key in filters ? filters[key] : [];
                    filterDropdown = React.createElement(_filterDropdown2['default'], { locale: locale, column: column, selectedKeys: colFilters, confirmFilter: _this7.handleFilter, prefixCls: prefixCls + '-filter', dropdownPrefixCls: dropdownPrefixCls || 'ant-dropdown', getPopupContainer: _this7.getPopupContainer, key: 'filter-dropdown' });
                }
                if (column.sorter) {
                    var isAscend = isSortColumn && sortOrder === 'ascend';
                    var isDescend = isSortColumn && sortOrder === 'descend';
                    sortButton = React.createElement(
                        'div',
                        { className: prefixCls + '-column-sorter', key: 'sorter' },
                        React.createElement(_icon2['default'], { className: prefixCls + '-column-sorter-up ' + (isAscend ? 'on' : 'off'), type: 'caret-up', theme: 'filled' }),
                        React.createElement(_icon2['default'], { className: prefixCls + '-column-sorter-down ' + (isDescend ? 'on' : 'off'), type: 'caret-down', theme: 'filled' })
                    );
                }
                return (0, _extends5['default'])({}, column, { className: (0, _classnames2['default'])(column.className, (_classNames3 = {}, (0, _defineProperty3['default'])(_classNames3, prefixCls + '-column-has-actions', sortButton || filterDropdown), (0, _defineProperty3['default'])(_classNames3, prefixCls + '-column-has-filters', filterDropdown), (0, _defineProperty3['default'])(_classNames3, prefixCls + '-column-has-sorters', sortButton), (0, _defineProperty3['default'])(_classNames3, prefixCls + '-column-sort', isSortColumn && sortOrder), _classNames3)), title: [React.createElement(
                        'div',
                        { key: 'title', title: sortButton ? locale.sortTitle : undefined, className: sortButton ? prefixCls + '-column-sorters' : undefined, onClick: function onClick() {
                                return _this7.toggleSortOrder(column);
                            } },
                        _this7.renderColumnTitle(column.title),
                        sortButton
                    ), filterDropdown] });
            });
        }
    }, {
        key: 'renderColumnTitle',
        value: function renderColumnTitle(title) {
            var _state3 = this.state,
                filters = _state3.filters,
                sortOrder = _state3.sortOrder;
            // https://github.com/ant-design/ant-design/issues/11246#issuecomment-405009167

            if (title instanceof Function) {
                return title({
                    filters: filters,
                    sortOrder: sortOrder
                });
            }
            return title;
        }
    }, {
        key: 'renderPagination',
        value: function renderPagination(paginationPosition) {
            // 强制不需要分页
            if (!this.hasPagination()) {
                return null;
            }
            var size = 'default';
            var pagination = this.state.pagination;

            if (pagination.size) {
                size = pagination.size;
            } else if (this.props.size === 'middle' || this.props.size === 'small') {
                size = 'small';
            }
            var position = pagination.position || 'bottom';
            var total = pagination.total || this.getLocalData().length;
            return total > 0 && (position === paginationPosition || position === 'both') ? React.createElement(_pagination2['default'], (0, _extends5['default'])({ key: 'pagination-' + paginationPosition }, pagination, { className: (0, _classnames2['default'])(pagination.className, this.props.prefixCls + '-pagination'), onChange: this.handlePageChange, total: total, size: size, current: this.getMaxCurrent(total), onShowSizeChange: this.handleShowSizeChange })) : null;
        }
        // Get pagination, filters, sorter

    }, {
        key: 'prepareParamsArguments',
        value: function prepareParamsArguments(state) {
            var pagination = (0, _extends5['default'])({}, state.pagination);
            // remove useless handle function in Table.onChange
            delete pagination.onChange;
            delete pagination.onShowSizeChange;
            var filters = state.filters;
            var sorter = {};
            if (state.sortColumn && state.sortOrder) {
                sorter.column = state.sortColumn;
                sorter.order = state.sortOrder;
                sorter.field = state.sortColumn.dataIndex;
                sorter.columnKey = this.getColumnKey(state.sortColumn);
            }
            var extra = {
                currentDataSource: this.getLocalData(state)
            };
            return [pagination, filters, sorter, extra];
        }
    }, {
        key: 'findColumn',
        value: function findColumn(myKey) {
            var _this8 = this;

            var column = void 0;
            (0, _util.treeMap)(this.columns, function (c) {
                if (_this8.getColumnKey(c) === myKey) {
                    column = c;
                }
            });
            return column;
        }
    }, {
        key: 'getCurrentPageData',
        value: function getCurrentPageData() {
            var data = this.getLocalData();
            var current = void 0;
            var pageSize = void 0;
            var state = this.state;
            // 如果没有分页的话，默认全部展示
            if (!this.hasPagination()) {
                pageSize = Number.MAX_VALUE;
                current = 1;
            } else {
                pageSize = state.pagination.pageSize;
                current = this.getMaxCurrent(state.pagination.total || data.length);
            }
            // 分页
            // ---
            // 当数据量少于等于每页数量时，直接设置数据
            // 否则进行读取分页数据
            if (data.length > pageSize || pageSize === Number.MAX_VALUE) {
                data = data.filter(function (_, i) {
                    return i >= (current - 1) * pageSize && i < current * pageSize;
                });
            }
            return data;
        }
    }, {
        key: 'getFlatData',
        value: function getFlatData() {
            return (0, _util.flatArray)(this.getLocalData());
        }
    }, {
        key: 'getFlatCurrentPageData',
        value: function getFlatCurrentPageData() {
            return (0, _util.flatArray)(this.getCurrentPageData());
        }
    }, {
        key: 'recursiveSort',
        value: function recursiveSort(data, sorterFn) {
            var _this9 = this;

            var _props$childrenColumn = this.props.childrenColumnName,
                childrenColumnName = _props$childrenColumn === undefined ? 'children' : _props$childrenColumn;

            return data.sort(sorterFn).map(function (item) {
                return item[childrenColumnName] ? (0, _extends5['default'])({}, item, (0, _defineProperty3['default'])({}, childrenColumnName, _this9.recursiveSort(item[childrenColumnName], sorterFn))) : item;
            });
        }
    }, {
        key: 'getLocalData',
        value: function getLocalData(state) {
            var _this10 = this;

            var currentState = state || this.state;
            var dataSource = this.props.dataSource;

            var data = dataSource || [];
            // 优化本地排序
            data = data.slice(0);
            var sorterFn = this.getSorterFn(currentState);
            if (sorterFn) {
                data = this.recursiveSort(data, sorterFn);
            }
            // 筛选
            if (currentState.filters) {
                Object.keys(currentState.filters).forEach(function (columnKey) {
                    var col = _this10.findColumn(columnKey);
                    if (!col) {
                        return;
                    }
                    var values = currentState.filters[columnKey] || [];
                    if (values.length === 0) {
                        return;
                    }
                    var onFilter = col.onFilter;
                    data = onFilter ? data.filter(function (record) {
                        return values.some(function (v) {
                            return onFilter(v, record);
                        });
                    }) : data;
                });
            }
            return data;
        }
    }, {
        key: 'createComponents',
        value: function createComponents() {
            var components = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var prevComponents = arguments[1];

            var bodyRow = components && components.body && components.body.row;
            var preBodyRow = prevComponents && prevComponents.body && prevComponents.body.row;
            if (!this.row || bodyRow !== preBodyRow) {
                this.row = (0, _createBodyRow2['default'])(bodyRow);
            }
            this.components = (0, _extends5['default'])({}, components, { body: (0, _extends5['default'])({}, components.body, { row: this.row }) });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this11 = this;

            var _props3 = this.props,
                style = _props3.style,
                className = _props3.className,
                prefixCls = _props3.prefixCls;

            var data = this.getCurrentPageData();
            var loading = this.props.loading;
            if (typeof loading === 'boolean') {
                loading = {
                    spinning: loading
                };
            }
            var table = React.createElement(
                _LocaleReceiver2['default'],
                { componentName: 'Table', defaultLocale: _default2['default'].Table },
                function (locale) {
                    return _this11.renderTable(locale, loading);
                }
            );
            // if there is no pagination or no data,
            // the height of spin should decrease by half of pagination
            var paginationPatchClass = this.hasPagination() && data && data.length !== 0 ? prefixCls + '-with-pagination' : prefixCls + '-without-pagination';
            return React.createElement(
                'div',
                { className: (0, _classnames2['default'])(prefixCls + '-wrapper', className), style: style },
                React.createElement(
                    _spin2['default'],
                    (0, _extends5['default'])({}, loading, { className: loading.spinning ? paginationPatchClass + ' ' + prefixCls + '-spin-holder' : '' }),
                    this.renderPagination('top'),
                    table,
                    this.renderPagination('bottom')
                )
            );
        }
    }]);
    return Table;
}(React.Component);

exports['default'] = Table;

Table.Column = _Column2['default'];
Table.ColumnGroup = _ColumnGroup2['default'];
Table.propTypes = {
    dataSource: PropTypes.array,
    columns: PropTypes.array,
    prefixCls: PropTypes.string,
    useFixedHeader: PropTypes.bool,
    rowSelection: PropTypes.object,
    className: PropTypes.string,
    size: PropTypes.string,
    loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    bordered: PropTypes.bool,
    onChange: PropTypes.func,
    locale: PropTypes.object,
    dropdownPrefixCls: PropTypes.string
};
Table.defaultProps = {
    dataSource: [],
    prefixCls: 'ant-table',
    useFixedHeader: false,
    className: '',
    size: 'default',
    loading: false,
    bordered: false,
    indentSize: 20,
    locale: {},
    rowKey: 'key',
    showHeader: true
};
module.exports = exports['default'];