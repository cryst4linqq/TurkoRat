echo off

echo NOTE: Make sure you have NodeJS and Visual Studio with all C++ prequisites installed. Otherwise this won't work

call npm install .
call npm install -g pkg
call npm install node-gyp
call npm install win-dpapi
call npm rebuild
call npm install is-wsl
call npm install temp-dir
call npm install archiver
call npm install archiver-zip-encrypted
call npm install node-machine-id
call npm intall child_process
