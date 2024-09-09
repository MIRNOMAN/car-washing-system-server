"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/User/user.route");
const service_router_1 = require("../modules/Service/service.router");
const slot_route_1 = require("../modules/Slot/slot.route");
const booking_router_1 = require("../modules/Booking/booking.router");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: user_route_1.AuthRoutes,
    },
    { path: '/services', route: service_router_1.serviceRoute },
    {
        path: '/slots',
        route: slot_route_1.slotRoutes,
    },
    {
        path: '/bookings',
        route: booking_router_1.BookingRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
