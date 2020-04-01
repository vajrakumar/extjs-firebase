/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('MyloginApp.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',
    onDeleteClick: function (btn) {
        var selectedRecords = this.lookupReference('employeeGrid').getSelection();
        employeeStore = this.getStore('EmployeeStore');
        employeeStore.remove(selectedRecords);
        var employeeData = employeeStore.getData();
        this.getEmployeeData(employeeData);
    },
    onSelectionChange: function (thisEl, selected, eOpts) {
        var vm = this.getViewModel();
        vm.set('editdisabled', selected.length != 1);
        vm.set('deletedisabled', !selected.length);
    },
    onAddClick: function (btn) {
        var grid = btn.up('grid');
        var addEditWindow = Ext.create('MyloginApp.view.login.AddEditWindow', {
            gridStore: grid.store
        });
        addEditWindow.show()
    },
    onEditWindow: function (btn) {
        var grid = btn.up('grid'),
            selectedRow = grid.getSelectionModel().getSelection()[0];
        var addEditWindow = Ext.create('MyloginApp.view.login.AddEditWindow', {
            title: 'Edit Person',
            isEdit: true,
            gridStore: grid.store
            // viewModel: {
            //     data: { user: selectedRow }
            // }
        });
        //  data.selectedRow = selectedRow
        addEditWindow.down('form').setViewModel({ data: { user: selectedRow } });
        addEditWindow.show();
    },
    onSaveClick: function (btn) {
        var me = this,
            formValues = btn.up('form').getValues();
        if (btn.up('window').isEdit) {
            var rec = this.getViewModel().get('currentPerson'),
                gridData = this.getView().gridStore.getData();
            this.getEmployeeData(gridData);
            // rec.commit();
        } else {
            var db = firebase.firestore(),
                loggedInUserEmail = firebase.auth().currentUser.email;
            var docRef = db.collection("users").doc(loggedInUserEmail),
                employeeGridStore = this.getView().gridStore;
            docRef.get().then(function (doc) {
                var existingData = [];
                if (doc.exists) {
                    existingData = doc.data().data;
                    if (!existingData)
                        existingData = [];
                }
                existingData.push(formValues);
                me.updateFireBaseDataBase(existingData, employeeGridStore);
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });
        }
        btn.up('window').close();
    },
    onSignout: function () {
        var me = this;
        firebase.auth().signOut().then(function () {
            me.getView().close();
            alert('Signout Successfully');
            // Sign-out successful.
        }).catch(function (error) {
            // An error happened.
        });
    },
    updateFireBaseDataBase: function (existingData, employeeGridStore) {
        var me = this,
            db = firebase.firestore(),
            employeeGridStore = me.getView() ? me.getView().gridStore : employeeGridStore;
        loggedInUserEmail = firebase.auth().currentUser.email;
        db.collection("users").doc(loggedInUserEmail).set(
            {
                data: existingData
            }).then(function () {
                me.onBeforeGridRender(employeeGridStore)
            })
    },
    onBeforeGridRender: function (employeeGridStore) {
        var me = this,
            employeeStore = this.getStore('EmployeeStore');
        if (Ext.isEmpty(employeeStore)) {
            employeeStore = employeeGridStore;
        }
        var db = firebase.firestore(),
            loggedInUserEmail = firebase.auth().currentUser.email;

        var docRef = db.collection("users").doc(loggedInUserEmail);
        docRef.get().then(function (doc) {
            if (doc.exists) {
                employeeStore.setData(doc.data().data);
                console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    },
    getEmployeeData: function (employeeData) {
        var employeeArray = [];
        employeeData.each(function (item) {
            employeeArray.push(item.data)
        });
        this.updateFireBaseDataBase(employeeArray)
    }
});
