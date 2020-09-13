import {deepEqual} from 'assert';
import {assert, expect} from 'chai';
import {ContractClientHttp} from '../../src/infrastructure/ContractClientHttp';

const fetchApi = require('node-fetch');

const contractClientHttp = new ContractClientHttp({
    basePath: "http://127.0.0.1:6366/api/v1",
    fetchApi: fetchApi
});
let drive = '';

describe('ContractClientHttp', () => {
    describe('ls', () => {
        it('should return list of contracts', (done) => {
            contractClientHttp.ls()
                .subscribe((contracts) => {
                    expect(contracts).not.to.be.undefined;
                    expect(contracts[0].drive).not.to.be.undefined;
                    // save drive for following test
                    drive = contracts[0].drive as string;
                    done();
            });
        });
    });

    describe('getContract', () => {
        it('should return contract detail', (done) => {
            contractClientHttp.getContract(drive)
                .subscribe((contract) => {
                    expect(contract).not.to.be.undefined;
                    expect(contract.drive).to.be.equal(drive);
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
});
