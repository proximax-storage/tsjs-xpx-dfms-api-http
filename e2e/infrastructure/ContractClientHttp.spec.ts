import { deepEqual } from 'assert';
import { assert, expect } from 'chai';
import { ContractClientHttp } from '../../src/infrastructure/ContractClientHttp';
import { ContractReplicatorHttp, DriveFsHttp, NetworkHttp } from '../../src/infrastructure/infrastructure';
import { InviteDTO } from '../../src/infrastructure';
import { createReadStream, readFileSync } from 'fs';
import { timer } from 'rxjs';
import { SuperContractHttp } from '../../src/infrastructure/SuperContractHttp';

const fetchApi = require('node-fetch');
const FormData = require('form-data');

const dfmsOwnerPk = '28FCECEA252231D2C86E1BCF7DD541552BDBBEFBB09324758B3AC199B4AA7B78';
const dfmsr1OwnerPk = 'FC6775204E2FF0CF8A6F4E1E4198BB4CF173BB804161A41E112A2A6943B1485D';
const dfmsr2OwnerPk = '7C22D8E6F5C2E1FA45BCC75D37F23E1C2029E71D32A9E66BE94D171B22CA499B';
const dfmsr3OwnerPk = 'A97B139EB641BCC841A610231870925EB301BA680D07BBCF9AEE83FAA5E9FB43';

const chainUrl = 'http://127.0.0.1:3000';
const clientPath = 'http://127.0.0.1:6366/api/v1';
const replicator1Path = 'http://127.0.0.1:6466/api/v1';
const replicator2Path = 'http://127.0.0.1:6467/api/v1';
const replicator3Path = 'http://127.0.0.1:6468/api/v1';

const driveFsHttp = new DriveFsHttp({
    basePath: clientPath,
    fetchApi: fetchApi
});
const network0Http = new NetworkHttp({
    basePath: clientPath,
    fetchApi: fetchApi
});
const contractClientHttp = new ContractClientHttp({
    basePath: clientPath,
    fetchApi: fetchApi
});
const supercontractHttp = new SuperContractHttp({
    basePath: clientPath,
    fetchApi: fetchApi
});

const contractReplicator1Http = new ContractReplicatorHttp({
    basePath: replicator1Path,
    fetchApi: fetchApi
});
const network1Http = new NetworkHttp({
    basePath: replicator1Path,
    fetchApi: fetchApi
});

const contractReplicator2Http = new ContractReplicatorHttp({
    basePath: replicator2Path,
    fetchApi: fetchApi
});
const network2Http = new NetworkHttp({
    basePath: replicator2Path,
    fetchApi: fetchApi
});

const contractReplicator3Http = new ContractReplicatorHttp({
    basePath: replicator3Path,
    fetchApi: fetchApi
});

const network3Http = new NetworkHttp({
    basePath: replicator3Path,
    fetchApi: fetchApi
});

let someCID = '';
let driveCID = '';
let helloWorldCID = '';

// TODO: move this to separate e2e spec file

describe('NetworkHttp', () => {
    let addr1: string | undefined;
    let addr2: string | undefined;
    let addr3: string | undefined;
    describe('addresses', () => {
        it('should return array of addresses of the dfms(r) node', (done) => {
            network0Http.addresses().subscribe(addresses => {
                expect(addresses).not.to.be.undefined;
                expect(addresses.length).to.be.greaterThan(0);
                done();
            });
        })
        it('should return array of addresses of the dfms(r) node', (done) => {
            network1Http.addresses().subscribe(addresses => {
                expect(addresses).not.to.be.undefined;
                expect(addresses.length).to.be.greaterThan(0);
                addr1 = addresses.find(address => address.indexOf('10.10.0') >= 0);
                expect(addr1).not.to.be.undefined;
                done();
            });
        })
        it('should return array of addresses of the dfms(r) node', (done) => {
            network2Http.addresses().subscribe(addresses => {
                expect(addresses).not.to.be.undefined;
                expect(addresses.length).to.be.greaterThan(0);
                addr2 = addresses.find(address => address.indexOf('10.10.0') >= 0);
                expect(addr2).not.to.be.undefined;
                done();
            });
        })
        it('should return array of addresses of the dfms(r) node', (done) => {
            network3Http.addresses().subscribe(addresses => {
                expect(addresses).not.to.be.undefined;
                expect(addresses.length).to.be.greaterThan(0);
                addr3 = addresses.find(address => address.indexOf('10.10.0') >= 0);
                expect(addr3).not.to.be.undefined;
                done();
            });
        })
    });

    describe('connect', () => {
        it('should connect 1st dfmsr with dfms', (done) => {
            network0Http.connect(addr1 as string).subscribe(() => {
                done();
            });
        });
        it('should connect 2nd dfmsr with dfms', (done) => {
            network0Http.connect(addr2 as string).subscribe(() => {
                done();
            });
        });
        it('should connect 3rd dfmsr with dfms', (done) => {
            network0Http.connect(addr3 as string).subscribe(() => {
                done();
            });
        });
    });

    describe('peers', () => {
        it('should get list of peers of the node', (done) => {
            network0Http.peers().subscribe(peers => {
                expect(peers).not.to.be.undefined;
                expect(peers.length).to.be.equal(3);
                done();
            })
        });
    });
});

describe('ContractClientHttp', () => {
    describe('ls', () => {
        it('should return list of contracts', (done) => {
            contractClientHttp.ls()
                .subscribe((contracts) => {
                    expect(contracts).not.to.be.undefined;
                    expect(contracts[0].drive).not.to.be.undefined;
                    // save drive for following test
                    someCID = contracts[0].drive as string;
                    done();
                });
        });
    });

    describe('getContract', () => {
        it('should return contract detail', (done) => {
            contractClientHttp.getContract(someCID)
                .subscribe((contract) => {
                    expect(contract).not.to.be.undefined;
                    expect(contract.drive).to.be.equal(someCID);
                    expect(contract.owner).not.to.be.undefined;
                    expect(contract.replicators).not.to.be.undefined;
                    expect(contract.root).not.to.be.undefined;
                    expect(contract.created).not.to.be.undefined;
                    expect(contract.duration).not.to.be.undefined;
                    expect(contract.billingPrice).not.to.be.undefined;
                    expect(contract.billingPeriod).not.to.be.undefined;
                    expect(contract.space).not.to.be.undefined;
                    expect(contract.replicas).not.to.be.undefined;
                    expect(contract.minReplicators).not.to.be.undefined;
                    expect(contract.percentApprovers).not.to.be.undefined;
                    done();
                });
        });
    });

    //    {'Invite':{'drive':'baegaajaiaqjcbp75vb6q3dt2sxg7w4pyzde72ts3fpxiijnnqva4wk35zqoclfb4','owner':'080412200eb448d07c7ccb312989ac27aa052738ff589e2f83973f909b506b450dc5c4e2','duration':18,'space':1,'payedReplicas':3,'minReplicators':3,'percentApprovers':66,'billingPrice':3,'billingPeriod':6}}

    let acceptedInvite: InviteDTO;
    describe('compose', () => {

        /*
        Prerequisities + scenario:
        1) start clean blockchain
        2) start 1x dfms with pk with funds
        3) start 3x dfmsr with pks with funds
        4) discover dfmsr addresses, take those on 10.x docker network
        5) register all to the network so they can see each other - call dfms endpoint with each of dfmsr address
           (alternatively to 4-5 - the other way around, discover dfms address, call each dfmsr endpoint with the dfms address)
        6) listen to /contract/invites on each of dfmsr (Note: we HAVE TO listen the dfmsr insance api endpoint, otherwise the dfmsr is not notified about the new contract and /contract/accept doesn't work on that dfmsr)
        7) call /contract/accept on each dfmsr with the cid from the invite
        8) finally, this /contract/compose returns
        */

        it('should compose a contract', (done) => {
            // subscribe for invites
            const subInvites1 = contractReplicator1Http.invites().subscribe(invite => {
                console.log(invite);
                subInvites1.unsubscribe();
                contractReplicator1Http.accept(invite.drive as string).toPromise().then(() => {
                    acceptedInvite = invite;
                    console.log('accept 1')
                    }, error => {
                        console.log(error);
                    });
                }, error => {
                    console.log(error);
                }
            );
            const subInvites2 = contractReplicator2Http.invites().subscribe(invite => {
                console.log(invite);
                subInvites2.unsubscribe();
                contractReplicator2Http.accept(invite.drive as string).toPromise().then(() => {
                    console.log('accept 2')
                    }, error => {
                        console.log(error);
                    });
                }, error => {
                    console.log(error);
                }
            );
            const subInvites3 = contractReplicator3Http.invites().subscribe(invite => {
                console.log(invite);
                subInvites3.unsubscribe();
                contractReplicator3Http.accept(invite.drive as string).toPromise().then(() => {
                    console.log('accept 3')
                    }, error => {
                        console.log(error);
                    });
                }, error => {
                    console.log(error);
                }
            );

            // subscribe for acceptations; Note - there are ContractDTOs comming in after .accept is called on the same dfmsr;
            // twice and multiple times - more the longer the dfmsr is running ... bug?
            const subAccepted1 = contractReplicator1Http.accepted().subscribe(result => {
                console.log('accepted 1');
                subAccepted1.unsubscribe();
            });
            const subAccepted2 = contractReplicator2Http.accepted().subscribe(result => {
                console.log('accepted 2');
                subAccepted2.unsubscribe();
            });
            const subAccepted3 = contractReplicator3Http.accepted().subscribe(result => {
                console.log('accepted 3');
                subAccepted3.unsubscribe();
            });

            const subCompose = contractClientHttp.compose(1000000, 3600, 3, 3, 100, 10, 66, undefined).subscribe((contract) => {
                console.log(contract);
                expect(contract).not.to.be.undefined;
                expect(contract.drive).to.be.equal(acceptedInvite.drive);
                expect(contract.owner).not.to.be.undefined;
                expect(contract.replicators).not.to.be.undefined;
                expect(contract.root).not.to.be.undefined;
                expect(contract.created).not.to.be.undefined;
                expect(contract.duration).not.to.be.undefined;
                expect(contract.billingPrice).not.to.be.undefined;
                expect(contract.billingPeriod).not.to.be.undefined;
                expect(contract.space).not.to.be.undefined;
                expect(contract.replicas).not.to.be.undefined;
                expect(contract.minReplicators).not.to.be.undefined;
                expect(contract.percentApprovers).not.to.be.undefined;

                // save the just created contrac for supercontract test below
                driveCID = contract.drive as string;
                done();
            }, error => {
                console.log(error);
            }, () => {
                console.log('Compose subscription complete.');
            });
        });
    });

    describe('supercontracts', () => {
        const scFileName = 'helloworld.wat';
        let scID = '';
        it('should add a file/supercontract source', (done) => {
            const path = '/';
            const data = readFileSync(__dirname + '/../../resources/helloworld.wat')
            const formData = new FormData();
            formData.append('file', data, {
                contentType: 'application/octet-stream',
                filename: scFileName,
            });
            driveFsHttp.add(driveCID, path, formData, false)
                .subscribe((result) => {
                    expect(result).not.to.be.undefined;
                    helloWorldCID = result.toString();
                    console.log('SC file CID: ' + helloWorldCID);
                    done();
                });
        });

        it('should call flush on the drive', (done) => {
            driveFsHttp.flush(driveCID).subscribe(() => {
                done();
            });
        });

        it('should deploy the supercontract', (done) => {
            supercontractHttp.deploy(driveCID, scFileName).subscribe(superContractID => {
                scID = superContractID;
                console.log('SC ID: ' + superContractID);
                done();
            });
        });

        it('should list supercontracts', (done) => {
            supercontractHttp.ls(driveCID).subscribe(superContracts => {
                expect(superContracts).not.to.be.undefined;
                expect(superContracts.length).to.be.greaterThan(0);
                expect(superContracts.find(sc => sc === scID)).to.be.equal(scID);
                done();
            });
        })

        it('should get the supercontract', (done) => {
            supercontractHttp.get(scID).subscribe(superContractDTO => {
                expect(superContractDTO.id).to.be.equal(scID);
                expect(superContractDTO.file).to.be.equal(helloWorldCID);
                expect((superContractDTO.drive as any).drive).to.be.equal(driveCID);
                expect(superContractDTO.vmversion).to.be.gte(1);
                // expect(superContractDTO.functions).not.to.be.undefined; // TODO: re-enable, once we have a sc with some fn
                done();
            });
        });

        xit('should call execute on the supercontract', (done) => {
            supercontractHttp.execute(scID, 10, 'app_main').subscribe(result => {
            // supercontractHttp.execute('baegqajaiaqjcao6rlsdhgbxnk5o2yg3ynpwnxfqckgaetqsgcns7slfppo2j5ds5', 10, 'app_main').subscribe(result => {
                console.log("Execute result: " + result);
                done();
            });
        });

        it('should get executions of the supercontract', (done) => {
            supercontractHttp.executions().subscribe(results => {
                console.log("Execute results: " + results)
                done();
            });
        });

        it('should deactivate a supercontract', (done) => {
            supercontractHttp.deactivate(scID).subscribe(() => {
                done();
            });
        });

    });

    xdescribe('verify', () => { // TODO: re-enable, get it working
        it('should verify a a contract', (done) => {
            contractClientHttp.verify(acceptedInvite.drive as any).subscribe((result) => {
                expect(result.length).to.be.equal(3);
                done();
            });
        });
    });

    xdescribe('finish', () => {
        it('should finish a contract', (done) => {
            contractClientHttp.finish(acceptedInvite.drive as any).subscribe(() => {
                done();
            });
        });
    });
});
