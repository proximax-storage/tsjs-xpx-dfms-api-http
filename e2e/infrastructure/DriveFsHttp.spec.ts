import { deepEqual } from 'assert';
import { assert, expect } from 'chai';
import { DriveFsHttp } from '../../src/infrastructure/DriveFsHttp';
import { TypeEnum } from '../../src/model/Stat';
import { pack as tarpack, extract as tarextract } from 'tar-stream';
import { createReadStream, createWriteStream } from 'fs';

const fetchApi = require('node-fetch');
const CID = require('cids');
const Readable = require('stream').Readable
const FormData = require('form-data');

const driveFsHttp = new DriveFsHttp({
    basePath: "http://127.0.0.1:6366/api/v1",
    fetchApi: fetchApi
});
const cid = 'baegbeibondkkrhxfprzwrlgxxltavqhweh2ylhu4hgo5lxjxpqbpfsw2lu';

describe('DriveFsHttp', () => {
    describe('cid', () => {
        it('should decode cid', (done) => {
            const cid = new CID('bafkreigaknpexyvxt76zgkitavbwx6ejgfheup5oybpm77f3pxzrvwpfdi');
            console.log(cid.version); // 1
            console.log(cid.codec);   // 0x0C - unknown; what is it?
            console.log(cid.multibaseName); // 'base32'
            console.log(cid.multihash);
            console.log(cid.toString());
            done();
        });
    });

    describe('mkDir', () => {
        it('should create a directory', (done) => {
            const path = 'someRootDir';
            driveFsHttp.mkDir(cid, path, false)
                .subscribe((result) => {
                    done();
                });
        });
        it('should create another directory', (done) => {
            const path = 'someRootDir/someDir';
            driveFsHttp.mkDir(cid, path, false)
                .subscribe((result) => {
                    done();
                });
        });
    });

    describe('mv', () => {
        it('should rename a file/directory', (done) => {
            const srcPath = 'someRootDir/someDir';
            const dstPath = 'someRootDir/someDirRenamed';
            driveFsHttp.mv(cid, srcPath, dstPath, false)
                .subscribe((result) => {
                    done();
                });
        });
    });

    describe('cp', () => {
        it('should rename a file/directory', (done) => {
            const srcPath = 'someRootDir/someDirRenamed';
            const dstPath = 'someRootDir/someDirRenamedCopied';
            driveFsHttp.cp(cid, srcPath, dstPath, false)
                .subscribe((result) => {
                    done();
                });
        });
    });

    describe('stat', () => {
        it('should get path stats', (done) => {
            const path = 'someRootDir';
            driveFsHttp.stat(cid, path)
                .subscribe((result) => {
                    expect(result.name).to.be.equal(path);
                    expect(result.size).not.to.be.undefined;
                    expect(result.type).to.be.equal(TypeEnum.Dir)
                    done();
                });
        });
    });

    describe('add', () => {
        it('should add a file', (done) => {
            const path = 'someRootDir/';

            const content = 'Hello world!';
            const name = 'newFile';
            const data = Buffer.alloc(content.length, content);

            /*
            const formData = {
                // Pass a simple key-value pair
                // my_field: 'my_value',
                // Pass data via Buffers
                // my_buffer: Buffer.from([1, 2, 3]),
                // Pass data via Streams
                // my_file: fs.createReadStream(__dirname + '/unicycle.jpg'),
                // Pass multiple values /w an Array
                // attachments: [
                //  fs.createReadStream(__dirname + '/attachment1.jpg'),
                //  fs.createReadStream(__dirname + '/attachment2.jpg')
                //],
                // Pass optional meta-data with an 'options' object with style: {value: DATA, options: OPTIONS}
                // Use case: for some types of streams, you'll need to provide "file"-related information manually.
                // See the `form-data` README for more information about options: https://github.com/form-data/form-data
                custom_file: {
                    // value:  fs.createReadStream('/dev/urandom'),
                    value: data,
                    options: {
                        filename: name
                    }
                }
            };*/
            const formData = new FormData();
            formData.append("file", data, {
                contentType: "application/octet-stream",
                filename: name,
            });

            driveFsHttp.add(cid, path, formData, false)
                .subscribe((result) => {
                    done();
                });
        });

        it('should add a folder', (done) => {
            const formData = new FormData();

            const path = 'someRootDir/';

            const content0 = '';
            const name0 = 'folder';
            const data0 = Buffer.alloc(0);

            const content1 = 'Hello 1st another world!';
            const name1 = 'newAnotherFile1';
            const data1 = Buffer.alloc(content1.length, content1);

            const content2 = 'Hello 2nd another world!';
            const name2 = 'newAnotherFile2';
            const data2 = Buffer.alloc(content2.length, content2);

            formData.append("file[]", data0, {
                contentType: "application/x-directory",
                filepath: name0,
            });
            formData.append("file[]", data1, {
                contentType: "application/octet-stream",
                filepath: name0 + "/" + name1,
            });
            formData.append("file[]", data2, {
                contentType: "application/octet-stream",
                filepath: name0 + "/" + name2,
            });

            driveFsHttp.add(cid, path, formData, false)
                .subscribe((result) => {
                    done();
                });
        });
    });

    describe('ls', () => {
        it('should list a file/directory', (done) => {
            const path = 'someRootDir';
            driveFsHttp.ls(cid, path)
                .subscribe((result) => {
                    console.log("someRootDir:");
                    result.forEach(s => console.log(" -> " + s.name + " (size: " + s.size + ", type: " + s.type + ")"));
                    expect(result.length).to.be.equal(4);
                    const sorted = result.sort((a, b) => (a.name < b.name ? -1 : (a.name > b.name ? 1 : 0)));
                    expect(sorted[0].name).to.contain('folder');
                    expect(sorted[1].name).to.contain('newFile');
                    expect(sorted[2].name).to.contain('someDirRenamed');
                    expect(sorted[3].name).to.contain('someDirRenamedCopied');
                    done();
                });
        });
        it('should list a file/directory', (done) => {
            const path = 'someRootDir/folder';
            driveFsHttp.ls(cid, path)
                .subscribe((result) => {
                    console.log("someRootDir/folder:");
                    result.forEach(s => console.log(" -> " + s.name + " (size: " + s.size + ", type: " + s.type + ")"));
                    expect(result.length).to.be.equal(2);
                    const sorted = result.sort((a, b) => (a.name < b.name ? -1 : (a.name > b.name ? 1 : 0)));
                    expect(sorted[0].name).to.contain('newAnotherFile1');
                    expect(sorted[1].name).to.contain('newAnotherFile2');
                    done();
                });
        });
    });

    describe('get', () => {
        it('should get a file', (done) => {
            const extract = tarextract();
            let fileBody = '';

            extract.on('entry', (header, stream, next) => {
                // header is the tar header
                // stream is the content body (might be an empty stream)
                // call next when you are done with this entry

                stream.on('data', (chunk) => {
                    fileBody += chunk;
                });

                stream.on('end', () => {
                    next(); // ready for next entry
                });

                stream.resume(); // just auto drain the stream
            });

            extract.on('finish', () => {
                expect(fileBody).to.be.equal('Hello world!');
                done();
            });

            const path = 'someRootDir/';

            const name = 'newFile';

            driveFsHttp.getAsText(cid, path + name)
                .subscribe((result) => {
                    const s = new Readable();
                    s.push(result);    // the string you want
                    s.push(null);      // indicates end-of-file basically - the end of the stream
                    s.pipe(extract);
                });
        });
    });

    describe('get', () => {
        /*
        it.only('should get a file as stream', (done) => {
            const downloadToFileStream = createWriteStream('/tmp/tempdownload.file');
            const extract = tarextract();

            extract.on('entry', (header, stream, next) => {
                // header is the tar header
                // stream is the content body (might be an empty stream)
                // call next when you are done with this entry

                stream.on('data', (chunk) => {
                    // fileBody += chunk;
                    downloadToFileStream.write(chunk, (error) => {
                        if (error) {
                            done('write stream failed')
                        }
                    })
                });

                stream.on('end', () => {
                    next(); // ready for next entry
                });

                stream.resume(); // just auto drain the stream
            });

            extract.on('finish', () => {
                // expect(fileBody).to.be.equal(content);
                done();
            });

            const path = 'someRootDir/';

            const name = 'newFile'; // can be huge

            driveFsHttp.getAsStream(cid, path + name, false)
                .subscribe((resultAsStream) => {
                    resultAsStream
                    .pipe(extract)
                    .on('error', (error) => {
                        done(error);
                    })
                    .on('finish', () => {
                        console.log("finished downloading stream");
                        done();
                    });
                });
        });
        */
    });

    describe('rm', () => {
        it('should delete a file/directory', (done) => {
            const path = 'someRootDir';
            driveFsHttp.rm(cid, path, false)
                .subscribe((result) => {
                    done();
                });
        });
    });
});
