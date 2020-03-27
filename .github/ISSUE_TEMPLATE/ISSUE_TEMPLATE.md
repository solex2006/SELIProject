---
name: 05 - Issue report
about: Use this template to track issues in development
labels: bug, env:development
title: ISSUE_SUBJECT
---

<!--- Not obligatory, but add a MODULE-LABEL if this issue ocurs in a specific module or function ---> 
<!--- Not obligatory, but add a ROLE-LABEL if this ocurs to a specific user role --->
<!--- Not obligatory, but add a TYPE-ERROR if you can identify the type of error --->



<!--- Provide a general summary of the issue in the Title above -->

## Expected Behavior
<!--- Tell us what should happen -->

## Current Behavior
<!--- Tell us what happens instead of the expected behavior -->

## Steps to Reproduce
<!--- Provide a link to a live example, or an unambiguous set of steps to -->
<!--- reproduce this bug. Include code to reproduce, if relevant -->
1.
2.
3.
4.

## Environment
<!--- Please tell us about your environment -->
Browser: all | Chrome XX | Firefox XX | IE XX | Safari XX | Mobile Chrome XX | Android X.X Web Browser | iOS XX Safari | iOS XX UIWebView | iOS XX WKWebView

## Possible Solution
<!--- Not obligatory, but suggest a fix/reason for the bug, -->
<!--- Provide a detailed description of the change or addition you are proposing -->

## Possible Implementation
<!--- Not obligatory, but suggest an idea for implementing addition or change -->

## Related issues
<!--- Not obligatory, but reference related issues --> 

# Glossary

:warning: The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED",  "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119/8174](http://www.rfc-editor.org/info/rfc8174).
> 1. **MUST** This word, or the terms "REQUIRED" or "SHALL", mean that the definition is an absolute requirement of the specification.
> 2. **MUST NOT** This phrase, or the phrase "SHALL NOT", mean that the definition is an absolute prohibition of the specification.
> 3. **SHOULD** This word, or the adjective "RECOMMENDED", mean that there may exist valid reasons in particular circumstances to ignore a particular item, but the full implications must be understood and carefully weighed before choosing a different course.
> 4. **SHOULD NOT** This phrase, or the phrase "NOT RECOMMENDED" mean that there may exist valid reasons in particular circumstances when the particular behavior is acceptable or even useful, but the full implications should be understood and the case carefully weighed before implementing any behavior described with this label.
> 5. **MAY**   This word, or the adjective "OPTIONAL", mean that an item is truly optional. An implementation which does not include a particular option MUST be prepared to interoperate with another implementation which does include the option, though perhaps with reduced functionality. In the same vein an implementation which does include a particular option MUST be prepared to interoperate with another implementation which does not include the option (except, of course, for the feature the option provides.)

## Bug Categories

INDEX|NAME|DESCRIPTION
-----|-----|-----
a11y|**Accessibility fault**| Accessibility related problems
API|**API Bug**| API is broken or invalid response is coming.
APP|**Application Crash**| Mobile apps are the biggest source of this bug. Some of the functions that can lead to crash of the application. These needs to be identified as early as possible and needs to be rectified.
BROWSER|**Browser Compatibility** |Sometimes latest updates are available and the program may not be compatible with the same.
CALC|**Calculation bugs** |improper logic for calculation. The bright example of such an error is the lost Mars Climate Orbiter. Such situation happened because there were used English units in the metric system.
COMM|**Communication issues**|The process of user’s communication with the product may be impossible because of this type of errors, for example, the guide is unavailable or the notifications are not shown.
FLOW|**Control flow bugs** |the violation of the sequence of actions.
DB|**Database Bugs** |If Data in the data base is not getting refreshed \ updated \ deleted or edited
FUNCTIONAL|**Functional Bugs** |The improper system behavior or enabled product features.
GUI|**GUI Related Bugs** |Relates to design of the Interface. It is either related to the Application Form \ Reports of the application. Also Page Layout issue on Various Screen Sizes can be come under this definition
ERRORS|**Improper handling of the errors** |if something goes wrong, the user should get the proper and clear notification. Its text should be short and contain all necessary information about the nature of the error and the ways of its possible removal.
10n|**Localization**| localization related problems
CMD|**Missing commands** |some expected commands are omitted in the system.
SYNTACTIC|**Syntactic bugs** |the grammar mistakes or misspelled words and sentences used in product GUI. 
SYS|**System Related bugs** |Any program which is not compatible with the Operating system, Hardware or the environment can lead to system related bugs
SSP|**Software Service Pack** |In case new updates are available in the system and application is not compatible with the new updates can lead to these bugs

The above-mentioned errors can be detected during different types of software testing, for example, functional, system, integration checking, etc. Besides that, there are several unusual bugs that may cause some difficulties in their discovering and fixing.

## Bug Priorities

PRIORITY|DESCPRITION
--------|---------
**LOW** |Bugs that do not interfere with core functionality and are just annoyances that may or may not ever be fixed. 
**MEDIUM** |Bugs that do not affect any critical user functionality. 
**HIGH** |Bugs that are related to the core functionality of the application, but don’t have to be fixed before product launch. However, these bugs should be fixed in the first available patch or release after launch. 
**CRITICAL** |Bugs that are mission critical to the core functionality of the application and for which there are no workarounds. These bugs absolutely must be fixed before the customer can release the app to the public.
