Ext.define('MyloginApp.view.login.Login', {
    extend: 'Ext.window.Window',
    xtype: 'login',

    requires: [
        'MyloginApp.view.login.LoginController',
        'Ext.form.Panel'
    ],

    controller: 'login',
    bodyPadding: 10,
    title: 'Login Window',
    closable: false,
    autoShow: true,
    items: {
        xtype: 'form',
        reference: 'loginform',
        items: [{
            xtype: 'textfield',
            name: 'email',
            fieldLabel: 'Email',
            vtype: 'email',
            allowBlank: false
        }, {
            xtype: 'textfield',
            name: 'password',
            inputType: 'password',
            fieldLabel: 'Password',
            allowBlank: false
        }],
        buttons: [{
            text: 'Login G+',
            listeners: {
                click: 'onGooglePlus'
            }
        }, {
            text: 'Login',
            formBind: true,
            listeners: {
                click: 'onLoginClick'
            }
        }, {
            text: 'SignUp',
            formBind: true,
            listeners: {
                click: 'onSignUp'
            }
        }]
    }
});