// const AnyProxy = require('anyproxy');
import * as AnyProxy from 'anyproxy';
import {rules} from './rules.js'

const options = {
    port: 8001,
    rule: rules,
    webInterface: {
        enable: true,
        webPort: 8002
    },
    throttle: 1e3,
    forceProxyHttps: false,
    silent: false
};

const proxyServer = new AnyProxy.ProxyServer(options);

proxyServer.on('ready', () => {
    console.log('proxy server is running');
});

proxyServer.on('error', (e) => {
    console.log('proxy server error', e);
});

proxyServer.start();
