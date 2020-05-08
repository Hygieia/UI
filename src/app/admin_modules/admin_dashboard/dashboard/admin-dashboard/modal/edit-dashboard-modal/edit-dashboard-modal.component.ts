import { Component, OnInit, Input } from '@angular/core';
import { DashboardDataService } from 'src/app/admin_modules/admin_dashboard/services/dashboard-data.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { WidgetManagerService } from 'src/app/admin_modules/admin_dashboard/services/widget-manager.service';
// import { extend } from 'lodash';
import * as _ from 'lodash';
import { UserDataService } from 'src/app/admin_modules/admin_dashboard/services/user-data.service';
import { CmdbDataService } from 'src/app/admin_modules/admin_dashboard/services/cmdb-data.service';
import { AdminDashboardService } from 'src/app/admin_modules/admin_dashboard/services/dashboard.service';
import { map, catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DashboardItem } from '../../model/dashboard-item';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-edit-dashboard-modal',
    templateUrl: './edit-dashboard-modal.component.html',
    styleUrls: ['./edit-dashboard-modal.component.scss']
})
export class EditDashboardModalComponent implements OnInit {

    @Input() public dashboardTitle = '';
    username: string;
    authType: string;
    @Input() dashboardItem: DashboardItem = new DashboardItem();
    activeWidgets: any[];
    scoreSettings: { scoreEnabled: boolean; scoreDisplay: any; };
    tabView: any;
    tabs: { name: string; }[];
    configurationItemBusApp: any;
    configurationItemBusServ: any;
    selectWidgetsDisabled: boolean;
    widgets: {};
    widgetSelections: any;
    users: any;
    owners: any;
    error: any;
    dupErroMessage: any;
    selectedWidgets: any;
    cdfForm: FormGroup;
    formBusinessService: FormGroup;
    isSubmit: boolean;
    userSearch = '';
    Object = Object;
    scoreDisplayType = {
        HEADER: 'HEADER',
        WIDGET: 'WIDGET'
    };
    selectHeaderOrWidgetToolTip = 'Dashboard score can either be displayed in header or as a widget.';
    searchconfigItemBus: any;



    constructor(private dashboardData: DashboardDataService, private authService: AuthService,
                private widgetManager: WidgetManagerService, private userData: UserDataService,
                private cmdbData: CmdbDataService, private dashboardService: AdminDashboardService,
                private fromBulider: FormBuilder, public activeModal: NgbActiveModal) { }

    ngOnInit() {
        this.username = this.authService.getUserName();
        this.authType = this.authService.getAuthType();
        this.dashboardData.owners(this.dashboardItem.id).subscribe(this.processOwnerResponse);
        this.dashboardData.detail(this.dashboardItem.id).subscribe(this.processDashboardDetail);
        this.configurationItemBusServ = this.dashboardItem.configurationItemBusServName;
        this.configurationItemBusApp = this.dashboardItem.configurationItemBusAppName;
        this.tabs = [
            { name: 'Dashboard Title' },
            { name: 'Business Service/ Application' },
            { name: 'Owner Information' },
            { name: 'Widget Management' },
            { name: 'Score' }
        ];
        this.tabView = this.tabs[0].name;
        this.activeWidgets = [];
        this.scoreSettings = {
            scoreEnabled: !!this.dashboardItem.scoreEnabled,
            scoreDisplay: this.dashboardItem.scoreDisplay
        };
        this.cdfForm = this.fromBulider.group({
            dashboardTitle: ['',
                [Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9 ]*$/)]]
        });
        this.formBusinessService = this.fromBulider.group({
            configurationItemBusServ: [''],
            configurationItemBusApp: ['']
        });

        this.getConfigItem('app', '');
        setTimeout(() => {
            console.log('dashboardItem' + JSON.stringify(this.dashboardItem));
            this.cdfForm.get('dashboardTitle').setValue(this.dashboardItem.name);
        }, 100);

    }

    searchconfigItemBusServ = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(term => term.length < 1 ? []
                : this.searchconfigItemBus.filter(v => {
                    const x = v.configurationItem;
                    const y = v.commonName;
                    return x.toLowerCase().indexOf(term.toLowerCase()) > -1 || y.toLowerCase().indexOf(term.toLowerCase()) > -1;
                }).slice(0, 10))
        )
    formatter = (x: { configurationItem: string }) => x.configurationItem;
    searchconfigItemBusApp = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(term => term.length < 1 ? []
                : this.searchconfigItemBus.filter(v => {
                    const x = v.commonName;
                    const y = v.commonName;
                    return x.toLowerCase().indexOf(term.toLowerCase()) > -1 || y.toLowerCase().indexOf(term.toLowerCase()) > -1;
                }).slice(0, 10))
        )
    formatterConfigItemBusApp = (x: { commonName: string }) => x.commonName;

    get f() { return this.cdfForm.controls; }

    get fB() { return this.formBusinessService.controls; }



    processDashboardDetail = (response) => {
        const data = response;
        this.activeWidgets = [];
        this.widgets = this.widgetManager.getWidgets();
        if (response.template === 'widgets') {
            this.selectWidgetsDisabled = false;
            this.activeWidgets = response.activeWidgets;
        } else {
            this.selectWidgetsDisabled = true;
            _.map(this.widgets, (value, key) => {
                this.activeWidgets.push(key);
            });
        }
        // collection to hold selected widgets
        const widgetSelections = {};
        // iterate through widgets and add existing widgets for dashboard
        console.log('widgets', this.widgets);
        _.map(this.widgets, (value, key) => {
            if (key !== '') {
                if (this.activeWidgets.indexOf(key) > -1) {
                    this.widgetSelections[key] = true;
                } else {
                    this.widgetSelections[key] = false;
                }
            }
        });

        Object.entries(this.widgets).map((widget: any) => {
            console.log('widget', widget);
            this.widgetSelections[widget[1].title] = false;
        });
    }

    processUserResponse = (response) => {
        console.log('user :', this.users, response);
        this.users = response;
    }

    processOwnerResponse = (response) => {
        this.owners = response;
        this.userData.users().subscribe(this.processUserResponse);
    }

    isActiveUser = (user) => {
        if (user.authType === this.authType && user.username === this.username) {
            return true;
        }
        return false;
    }

    promoteUserToOwner(user) {
        const index = this.users.indexOf(user);
        if (index > -1) {
            this.owners.push(user);
        }
    }

    demoteUserFromOwner(user) {
        const index = this.owners.indexOf(user);
        if (index > -1) {
            this.owners.splice(index, 1);
        }
    }

    saveForm() {
        console.log('tabview ', this.tabView);
        switch (this.tabView) {
            case 'Dashboard Title':
                this.submit('');
                break;
            case 'Business Service/ Application':
                this.submitBusServOrApp('');
                break;
            case 'Owner Information':
                console.log('ownerFormSubmit');
                this.ownerFormSubmit('');
                break;
            case 'Widget Management':
                this.saveWidgets('');
                break;
            case 'Score':
                this.submitScoreSettings('');
                break;
        }
    }

    submit(form) {
        if (this.cdfForm.valid) {
            this.isSubmit = true;
            this.renameSubmit()
                .subscribe(() => {
                    this.activeModal.dismiss();
                    this.isSubmit = false;
                }, (error: any) => {
                    this.isSubmit = false;
                    this.activeModal.close();
                    this.error = error.data;
                });
        }
    }

    renameSubmit() {
        console.log('value', this.cdfForm.get('dashboardTitle'));
        return this.dashboardData.renameDashboard(this.dashboardItem.id, this.cdfForm.get('dashboardTitle').value)
            .pipe(map((response: any) => {
                return response;
            }));
    }
    ownerFormSubmit(form) {
        console.log('form', form);
        this.ownerSubmit()
            .subscribe(() => {
                this.activeModal.dismiss();
            }, (error: any) => {
                this.activeModal.close();
                this.error = error.data;
            });
    }
    ownerSubmit() {
        console.log('users save', this.owners);
        return this.dashboardData.updateOwners(this.dashboardItem.id, this.prepareOwners(this.owners))
            .pipe(map((response: any) => {
                return response;
            }));
    }

    prepareOwners(owners) {
        const putData = [];

        owners.forEach((owner) => {
            putData.push({ username: owner.username, authType: owner.authType });
        });

        return putData;
    }

    submitBusServOrApp(form) {
        if (this.formBusinessService.valid) {
            const submitData = {
                configurationItemBusServName: this.formBusinessService.get('configurationItemBusServ').value.configurationItem,
                configurationItemBusAppName: this.formBusinessService.get('configurationItemBusApp').value.commonName
            };
            this.dashboardData
                .updateBusItems(this.dashboardItem.id, submitData)
                .subscribe((data: any) => {
                    this.activeModal.dismiss();
                }
                    , (error: any) => {
                        if (error) {
                            this.dupErroMessage = error;
                        }
                    });
        }

    }

    getConfigItem(type, filter) {
        return this.cmdbData.getConfigItemList(type, { search: filter, size: 20 })
            .subscribe((response) => {
                console.log('getConfigItem', response);
                this.searchconfigItemBus = response;
            });
    }
    getDashboardTitle() {
        return this.dashboardService.getDashboardTitleOrig(this.dashboardItem);
    }

    getBusAppToolText() {
        return this.dashboardService.getBusAppToolTipText();
    }

    getBusSerToolText() {
        return this.dashboardService.getBusSerToolTipText();
    }
    tabToggleView(index) {
        this.dupErroMessage = '';
        this.tabView = typeof this.tabs[index] === 'undefined' ? this.tabs[0].name : this.tabs[index].name;
    }
    resetFormValidation(form) {
        this.dupErroMessage = '';
        form.configurationItemBusServ.$setValidity('dupBusServError', true);
        if (form.configurationItemBusApp) {
            form.configurationItemBusApp.$setValidity('dupBusAppError', true);
        }

    }
    isValidBusServName() {
        let valid = true;
        if (this.dashboardItem.configurationItemBusServName !== undefined && !this.dashboardItem.validServiceName) {
            valid = false;
        }
        return valid;
    }
    isValidBusAppName() {
        let valid = true;
        if (this.dashboardItem.configurationItemBusAppName !== undefined && !this.dashboardItem.validAppName) {
            valid = false;
        }
        return valid;
    }

    // Save template - after edit
    saveWidgets(form) {
        this.findSelectedWidgets();
        if (form.$valid) {
            const submitData = {
                activeWidgets: this.selectedWidgets
            };
            this.dashboardData
                .updateDashboardWidgets(this.dashboardItem.id, submitData)
                .subscribe((data) => {
                    // $uibModalInstance.close();
                }
                    , (error: any) => {
                        const msg = 'An error occurred while editing dashboard';
                        this.swal(msg);
                    });
        }
    }

    // find selected widgets and add it to collection
    findSelectedWidgets() {
        this.selectedWidgets = [];
        for (const selectedWidget in this.widgetSelections) {
            let s = this.widgetSelections[selectedWidget];
            if (s) {
                this.selectedWidgets.push(selectedWidget);
            }
        }
    }

    onConfigurationItemBusAppSelect(value) {
        this.configurationItemBusApp = value;
    }

    submitScoreSettings(form) {
        if (this.scoreSettings.scoreEnabled) {
            this.dashboardData
                .updateDashboardScoreSettings(this.dashboardItem.id, this.scoreSettings.scoreEnabled, this.scoreSettings.scoreDisplay)
                .subscribe((data: any) => {
                    this.activeModal.dismiss();
                },
                    (error: any) => {
                        const msg = 'An error occurred while editing dashboard';
                        this.swal(msg);
                    });
        }
    }
    swal(info: any) {
        console.log('swal', 'info', info);
    }

}
