/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'MyloginApp.Application',

    name: 'MyloginApp',

    requires: [
        // This will automatically load all classes in the MyloginApp namespace
        // so that application classes do not need to require each other.
        'MyloginApp.*'
    ],

    // The name of the initial view to create.
  //  mainView: 'MyloginApp.view.main.Main'
});
