# SafeHaven
Direct Mail Scenario

Time Log
-----
* 5/17 - Workspace Setup - 3hrs - YUI & NPM UglifyJS.
* 5/18 - Server Setup - 3hrs - Google Cloud LAMP Micro server. Debian GNU/Linux 11 (bullseye), Apache 2, PHP 8.1, MySQL 8.0
* 5/18 - Page layout - 8hrs - CSS layout, SEO, Best Practices, Performance.
* 5/19 - Page JS and - 10hrs - User Events, Form submission, Call Now click logging, UTM info capture, User info capture. Geolocation services setup.

Tools & Libraries
-----
* Google Cloud Services - Compute Engine: https://cloud.google.com/
* HTTPS Everywhere - Server SSL Cert: https://www.eff.org/https-everywhere
* UglifyJS for JS Compression: https://github.com/mishoo/UglifyJS/
* YUI Compressor for CSS & JS Module Compression: https://yui.github.io/yuicompressor/
* Squoosh for image conversion into AVIF format: https://squoosh.app/
* Apache Mod Rewrite for dynamic location directories: https://httpd.apache.org/docs/2.4/mod/mod_rewrite.html
* Created a Windows bat file to automate CSS & JS file compression after updates: [.gcc/compile.bat 
](https://github.com/ghenle/SafeHaven/blob/main/.gcc/compile.bat)

Lighthouse Testing
-----
Lighthouse applies a 4x slowdown to the CPU to simulate a mid-tier mobile phone performance. This is seen when loading the hero image (LCP) at the top of the page. Desktop 360 ms, Mobile 1,520 ms.  

Google Geolocation Services API
-----
Geolocation services are used to get the user's location and fill the form with the associated ZIP Code. The original plan was to use the location to redirect the customer to the nearest service area. I simplified prefilling the form for several reasons.
* A customer lead is a customer lead, and given more options and distractions, it is an opportunity to second-guess, reconsider, and not click.
* It would distort marketing analytics.
* Loading the Geolocation API was slowing the page Loading
* The potential customer may be traveling and not at the location where they want service.

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

