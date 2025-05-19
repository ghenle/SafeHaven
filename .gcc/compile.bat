:: https://mvnrepository.com/artifact/com.google.javascript/closure-compiler
del "..\js\*.min.js" /S /Q
del "..\js\*.min.js.map" /S /Q

:: 20220502 last version compatable with JAVA8
::
:: Noise tp ignore
:: WARNING: A terminally deprecated method in sun.misc.Unsafe has been called
:: WARNING: sun.misc.Unsafe::arrayBaseOffset has been called by com.google.javascript.jscomp.jarjar.com.google.protobuf.UnsafeUtil$MemoryAccessor (file:/C:/Users/ghenl/Desktop/SafeHaven/gcc/closure-compiler-v20250407.jar)
:: WARNING: Please consider reporting this to the maintainers of class com.google.javascript.jscomp.jarjar.com.google.protobuf.UnsafeUtil$MemoryAccessor
:: WARNING: sun.misc.Unsafe::arrayBaseOffset will be removed in a future release
:: forfiles /p "..\js" /m *.js /c "cmd /c java -jar %~dp0\closure-compiler-v20250407.jar --js @file --create_source_map @fname.min.js.map --dynamic_import_alias=import_ --source_map_format=V3 --js_output_file @fname.min.js"
:: https://github.com/mishoo/UglifyJS/issues/1905#issuecomment-300485490
forfiles /p "..\js" /m *.js /c "cmd /c uglifyjs @file -cmo @fname.min.js --source-map url=@fname.min.js.map"
::forfiles /p "..\js" /m *.js /c "cmd /c java -jar %~dp0\yuicompressor-2.4.8.jar @file -o @fname.min.js --charset utf-8"

:: https://github.com/yui/yuicompressor/releases
del "..\css\*.min.css" /S /Q

forfiles /p "..\css" /m *.css /c "cmd /c java -jar %~dp0\yuicompressor-2.4.8.jar @file -o @fname.min.css --charset utf-8"

