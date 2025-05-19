# SafeHaven
Direct Mail Scenario

Time Log
-----
* 5/17 - Workspace Setup - 3hrs - YUI & GCC newer versions available. Needed a reinstall of JAVA on my laptop
* 5/18 - Server Setup - 3hrs - Google Cloud LAMP Micro server. Debian GNU/Linux 11 (bullseye), Apache 2, PHP 8.1, MySQL 8.0
* 5/18 - Page layout - 6hrs - CSS layout, SEO, Best Practices, Performance. Lighthouse Mobile 96,100,100,100. Desktop 99,100,100,100.

Tools & Libraries
-----
* Google Cloud Services - Compute Engine: https://cloud.google.com/
* HTTPS Everywhere - Server SSL Cert: https://www.eff.org/https-everywhere
* Google Closuer Compiler for JS Compression: https://developers.google.com/closure/compiler
* YUI Compressor for CSS & JS Module Compression: https://yui.github.io/yuicompressor/
* Squoosh for image conversion into AVIF format: https://squoosh.app/
* Apache Mod Rewrite for dynamic location directories: https://httpd.apache.org/docs/2.4/mod/mod_rewrite.html
* Created a Windows bat file to automate CSS & JS file compression after updates: [.gcc/compile.bat 
](https://github.com/ghenle/SafeHaven/blob/main/.gcc/compile.bat)

Demo URLs
-----
* https://www.bad.fyi/
* https://www.bad.fyi/CharlotteNC?utm_source=valpak
* https://www.bad.fyi/WinstonSalemNC

Captured info on form submit
-----
```php
Array
(
    [name] => "John & Jane Doe"
    [email] => "user@example.com"
    [phone] => "1234567890"
    [zip] => "12345-1234"
    [preferred] => "email"
    [utm_source] => "valpak"
    [utm_medium] => 
    [utm_campaign] => 
    [utm_term] => 
    [utm_content] => 
    [service_area] => "/CharlotteNC"
    [in_service_area] => "NO"
)

Array
(
    [name] => "John & Jane Doe"
    [email] => "user@example.com"
    [phone] => "123-456-7890"
    [zip] => "12345"
    [preferred] => "email"
    [utm_source] => "valpak"
    [utm_medium] => 
    [utm_campaign] => 
    [utm_term] => 
    [utm_content] => 
    [service_area] => "/CharlotteNC"
    [in_service_area] => "YES"
)
```
