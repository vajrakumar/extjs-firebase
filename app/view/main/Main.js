/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('MyloginApp.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'MyloginApp.view.main.MainController',
        'MyloginApp.view.main.MainModel',
        'MyloginApp.view.main.List'
    ],

    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',
    plugins: 'viewport',
    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,
    items: [{
        xtype: 'mainlist'
    }],
    bbar: [{
        text: 'Signout',
        handler: 'onSignout'
    }],
    // initComponent: function () {

    // }
});
