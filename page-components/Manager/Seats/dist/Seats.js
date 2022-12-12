"use strict";
exports.__esModule = true;
var react_1 = require("react");
var components_1 = require("@/components");
var link_1 = require("next/link");
var routes_1 = require("@/constants/routes");
var phosphor_react_1 = require("phosphor-react");
var next_i18next_1 = require("next-i18next");
var seat_1 = require("@/lib/seat");
var clsx_1 = require("clsx");
var Seats = function () {
    var t = next_i18next_1.useTranslation(['common', 'manager']).t;
    var _a = seat_1.useSeats(), _b = _a.data, seats = (_b === void 0 ? {} : _b).data, isValidating = _a.isValidating;
    var examActions = react_1.useMemo(function () { return [
        {
            label: t('action.duplicate'),
            onClick: function () { }
        },
        {
            label: t('action.edit'),
            onClick: function () { }
        },
    ]; }, []);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: "bg-management bg-center bg-cover pt-4 pb-8 px-8" },
            react_1["default"].createElement(components_1.Breadcrumbs, { maxItems: 3, className: "pb-6" },
                react_1["default"].createElement(link_1["default"], { href: routes_1.routes.manager.orders.generatePath() },
                    react_1["default"].createElement("a", null,
                        react_1["default"].createElement(phosphor_react_1.House, { weight: "fill", size: 20 }))),
                react_1["default"].createElement(components_1.Typography, null, t('seats.title', { ns: 'manager' }))),
            react_1["default"].createElement(components_1.Stack, { direction: "column" },
                react_1["default"].createElement(components_1.Typography, { fontSize: "display-md", weight: "medium" }, t('seats.title', { ns: 'manager' })),
                react_1["default"].createElement(components_1.Stack, null,
                    react_1["default"].createElement(phosphor_react_1.Table, { size: 24, weight: "fill", className: "text-primary-400" })))),
        react_1["default"].createElement("div", { className: "px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-8" }, seats === null || seats === void 0 ? void 0 : seats.map(function (seat) {
            return (react_1["default"].createElement("div", { className: "relative h-full max-w-[300px]", key: seat.id },
                react_1["default"].createElement("div", { className: "flex flex-col items-center h-full shadow-md rounded-lg border-2 border-gray-200 px-4 pt-8 pb-6 bg-white" },
                    react_1["default"].createElement("div", { className: "h-full flex flex-col items-center" },
                        react_1["default"].createElement(components_1.Typography, { transform: "capitalize", weight: "semibold", variant: "p", fontSize: "text-xs", align: "center", className: "mt-1 mb-3" },
                            "B\u00E0n s\u1ED1 ",
                            seat.position),
                        react_1["default"].createElement(components_1.Typography, { transform: "capitalize", weight: "semibold", variant: "p", fontSize: "text-xs", align: "center", className: "mt-1 mb-3" }, seat.content),
                        react_1["default"].createElement(components_1.Badge, { size: "sm", color: seat.isReady ? 'success' : 'error', className: "w-fit" }, seat.isReady ? 'Trống' : 'Sử dụng'))),
                react_1["default"].createElement("div", { className: "absolute right-2 top-3" },
                    react_1["default"].createElement(components_1.Dropdown, { className: "inline-flex flex-shrink-0", preventClose: false, overlay: react_1["default"].createElement(components_1.Menu, { maxWidth: 172, placement: "bottom-right" }, examActions.map(function (item, index) { return (react_1["default"].createElement(react_1["default"].Fragment, null,
                            react_1["default"].createElement(components_1.MenuItem, { className: "text-gray-700", onClick: item.onClick, key: index }, item.label))); })) },
                        react_1["default"].createElement(components_1.Button, { variant: "text", color: "gray", onlyIcon: true, className: "!p-0" },
                            react_1["default"].createElement(phosphor_react_1.DotsThreeVertical, { size: 22, weight: "bold" })))),
                react_1["default"].createElement("div", { className: "absolute left-2 top-2" },
                    react_1["default"].createElement("span", { className: "flex h-2 w-2" },
                        react_1["default"].createElement("span", { className: clsx_1.clsx('animate-ping absolute inline-flex h-full w-full rounded-full opacity-75', seat.isReady ? 'bg-success-500' : 'bg-red-500') }),
                        react_1["default"].createElement("span", { className: clsx_1.clsx('relative inline-flex rounded-full h-2 w-2', seat.isReady ? 'bg-success-500' : 'bg-red-500') })))));
        }))));
};
exports["default"] = Seats;
