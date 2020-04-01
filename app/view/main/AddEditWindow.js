Ext.define('MyloginApp.view.login.AddEditWindow', {
    extend: 'Ext.window.Window',
    xtype: 'addedit',

    requires: [
        'MyloginApp.view.main.MainController',
        'Ext.form.Panel',
        'MyloginApp.view.main.MainModel',
    ],
    viewModel: 'main',
    controller: 'main',
    bodyPadding: 10,
    title: 'Add User',
    height: '55%',
    width: '50%',
    closable: true,
    closeAction: 'destroy',
    items: {
        xtype: 'form',
        reference: 'form',
        items: [{
            xtype: 'textfield',
            name: 'name',
            fieldLabel: 'Name',
            allowBlank: false,
            bind: '{user.name}'
        }, {
            xtype: 'textfield',
            name: 'email',
            fieldLabel: 'Email',
            vtype: 'email',
            allowBlank: false,
            bind: '{user.email}'
        }, {
            xtype: 'radiogroup',
            fieldLabel: 'Gender',
            columns: 3,
            vertical: false,
            bind: {
                value: {
                    gender: '{user.gender}'
                }
            },
            items: [
                {
                    boxLabel: 'Male',
                    name: 'gender',
                    inputValue: 'Male',
                    //       bind: '{user.gender}',
                    id: 'male'
                }, {
                    boxLabel: 'Female',
                    name: 'gender',
                    inputValue: 'Female',
                    //       bind: '{user.gender}',
                    id: 'female'
                }, {
                    boxLabel: 'Neutral',
                    name: 'gender',
                    //       bind: '{user.gender}',
                    inputValue: 'Neutral',
                    id: 'neutral'
                }
            ]
        }, {
            xtype: 'numberfield',
            name: 'phone',
            hideTrigger: true,
            allowDecimals: false,
            minLength: 10,
            maxLength: 11,
            fieldLabel: 'Mobile-No',
            allowBlank: true,
            bind: '{user.phone}'
        }, {
            xtype: 'textfield',
            name: 'designation',
            fieldLabel: 'Designation',
            allowBlank: false,
            bind: '{user.designation}'
        }, {
            xtype: 'textfield',
            name: 'place',
            fieldLabel: 'Place',
            allowBlank: false,
            bind: '{user.place}'
        }],
        buttons: [{
            text: 'Save',
            formBind: true,
            listeners: {
                click: 'onSaveClick'
            }
        }]
    }
});