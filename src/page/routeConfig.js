export default [
    {
        path: '/home',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./home'))
            })
        }
    },

    // demo
    {
        path: '/demo/table-demo',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./demo/table-demo/TableDemo.jsx'))
            })
        }
    },
    {
        path: '/demo/info-card-demo',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./demo/info-card-demo/InfoCardDemo.jsx'))
            })
        }
    },
    {
        path: '/demo/upload-demo',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./demo/upload-demo/UploadDemo.jsx'))
            })
        }
    },


    //404
    {
        path: '/404',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./not-found'))
            })
        }
    }
]

