import {deepEqual} from 'assert';
import {assert, expect} from 'chai';
import {DriveFsHttp} from '../../src/infrastructure/DriveFsHttp';
import { TypeEnum } from '../../src/model/Stat';

const CID = require('cids');
const tar = require('tar-stream');
const Readable = require('stream').Readable

const driveFsHttp = new DriveFsHttp("http://127.0.0.1:6366/api/v1");
const cid = 'baegbeibondkkrhxfprzwrlgxxltavqhweh2ylhu4hgo5lxjxpqbpfsw2lu';

describe('DriveFsHttp', () => {
    describe('cid', () => {
        xit('should decode cid', (done) => {
            const cid = new CID('baegbeibondkkrhxfprzwrlgxxltavqhweh2ylhu4hgo5lxjxpqbpfsw2lu')
            console.log(cid.version); // 1
            console.log(cid.codec);   // 0x0C - unknown; what is it?
            console.log(cid.multibaseName); // 'base32'
            console.log(cid.toString());
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

    describe('ls', () => {
        it('should list a file/directory', (done) => {
            const path = 'someRootDir';
            driveFsHttp.ls(cid, path)
                .subscribe((result) => {
                    expect(result.length).to.be.equal(2);
                    expect(result[0].name).to.contain('someDirRenamed');
                    expect(result[1].name).to.contain('someDirRenamed');
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
              };

            const options = {
//                headers: {
//                    'Content-Type': 'multiparm/form-data'
//                },
                formData: formData
            };

            driveFsHttp.add(cid, path, false, options)
                .subscribe((result) => {
                    done();
            });
        });
    });

    describe('get', () => {
        it('should get a file', (done) => {
            const pack = tar.pack(); // pack is a streams2 stream
            const extract = tar.extract();
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

            pack.pipe(extract);

            const path = 'someRootDir/';

            const content = 'Hello world!';
            const name = 'newFile';

            driveFsHttp.get(cid, path +name, false)
                .subscribe((result) => {
                    const s = new Readable();
                    s.push(result);    // the string you want
                    s.push(null);      // indicates end-of-file basically - the end of the stream
                    s.pipe(extract);
            });
        });

    });

    describe('rm', () => {
        it('should delete a file/directory', (done) => {
            const path = 'someRootDir';
            driveFsHttp.rm(cid, path, false, false)
                .subscribe((result) => {
                    done();
            });
        });
    });
});
