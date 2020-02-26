var node_acl = require('acl');

let acl = new node_acl(new node_acl.memoryBackend(), {
    debug: (msg) => {
        console.log('-DEBUG-', msg);
    }
});

acl.allow([
    {
        roles: 'manager',
        allows: [
            {
                resources: '/admin',
                permissions: '*'
            },
            {
                resources: '/qlhs',
                permissions: '*'
            },
            {
                resources: '/qllh',
                permissions: '*'
            },
            {
                resources: '/qltk',
                permissions: '*'
            },
            {
                resources: '/qlmh',
                permissions: '*'
            },
            {
                resources: '/qlhk',
                permissions: '*'
            },
            {
                resources: '/qlgv',
                permissions: '*'
            },
            {
                resources: '/qlgvdl',
                permissions: '*'
            },
            {
                resources: '/qld',
                permissions: '*'
            },
        ],
    },
    {
        roles: 'teacher',
        allows: [
            {
                resources: '/admin',
                permissions: '*'
            },
            {
                resources: '/qlhs',
                permissions: '*'
            },
            {
                resources: '/qld',
                permissions: '*'
            },
        ]
    },
    {
        roles: 'student',
        allows: [
            {
                resources: '/posts',
                permissions: 'get'
            }
        ]
    }
]);

acl.addUserRoles("root", "manager");
acl.addUserRoles("root2", "teacher");

module.exports = acl;