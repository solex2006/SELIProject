---
name: Feature Requirement
about: Use this template for create a fetaure requiremment.
labels: REQUIREMENT
title: REQ_[CATEGORY]_[INDEX] SUBJECT
---
<!--- General description --->

# INDEX
1 [REQUIREMENT](#requirement)
1.1 [USER STORIES](#user-stories)
1.2 [USER ACCEPTANCE TESTS](#user-acceptance-tests)
1.3 [WORKFLOW](#workflow)
1.4 [REQUIREMENTS (DETAILS)](#requirement-details)
1.5 [WIREFRAMES](#wireframes)
1.6 [REFERENCED REQUIREMENTS](#referenced-requirements)
2 [RESOURCES](#resources)
2.1 [TOOLS](#tools)
2.2 [SUGGESTED IMPLEMENTATION](#suggested-implementation)
2.3 [REFERENCES](#references)
3 [GLOSSARY](#glossary)

# REQUIREMENT

## USER STORIES
This states all of the scenarios of the users involved. These should read:
As a SOME ROLE,
I want to DO SOMETHING,
So that I CAN GET SOME BENEFIT
The user stories are critical to lay out exactly who is going to do what, and for what reason(s).

## USER ACCEPTANCE TESTS
These should include all scenarios outlined in the user stories. These should not be too detailed (they don’t need to mention specific screens or a complete list of actions to execute the steps). These should read:

GIVEN that condition 1 and condition 2….
WHEN I do step 1, and step 2…
THEN, desired result 1, desired result 2….

These define a set of actual scenarios a tester could walk through to assert that the feature is complete. These are not detailed test scripts that you find in UAT. They are meant to convey a set of tests that all involved can walk through to understand how the feature will work.

## WORKFLOW
This should include a picture of the screens involved. 
Error states and view changes based on role should be documented. 
This picture is worth a thousand words, as the details of the flow through the feature can be quite complex, and this is hard to spell out the details in the next section. We have been using Gliffy, a confluence plugin, and it rocks. It is a flash app that allows us to create and edit the workflows with eases.

## REQUIREMENT DETAILS
These are the details of the feature. Document all screen(s) and every field, label, validation, message, and action. This is essentially the functional specification of the details of the screen(s) involved. Because it is in the context of the wireframe (next section), it is more concise. You can simply reference the field name, rather than verbosely state everything about the field. You can keep the details to field length, required, etc.

## WIREFRAMES
A picture is required for each screen involved. Wireframes can be simple drawings on a whiteboard that are photographed, or a set of boxes created in Visio or OmniGraffle (or anything really). Some are photoshop-ed, and others are HTML. We have found that the best approach is HTML if that’s your end result. Recreating HTML that looks the exact same as a picture can be quite painful. Usually, a visual designer is involved in creating the mock ups, and can easily do this work in HTML. The developers can therefore take the exact HTML that is requested, and fill in their code as needed.

## REFERENCED REQUIREMENTS
<!--- Reference requirements that should be meet together --->
<!--- Reference requirements that replace this requiremebt --->



# RESOURCES
<!--- resources to help implement / understadment of some technique --->

## SUGGESTED IMPLEMENTATION
Some code or pseudo-code
```

```
## TOOLS
PLUGINS, LIBRARIES, FRAMEWORKS, ETC
1. 
2.
3.

## REFERENCES

- [Some external reference](https://github.com)
- [Understanding Techniques for WCAG Success Criteria](https://www.w3.org/WAI/WCAG21/Understanding/understanding-techniques)

# GLOSSARY 


:warning: The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED",  "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119/8174](http://www.rfc-editor.org/info/rfc8174).
> 1. **MUST** This word, or the terms "REQUIRED" or "SHALL", mean that the definition is an absolute requirement of the specification.
> 2. **MUST NOT** This phrase, or the phrase "SHALL NOT", mean that the definition is an absolute prohibition of the specification.
> 3. **SHOULD** This word, or the adjective "RECOMMENDED", mean that there may exist valid reasons in particular circumstances to ignore a particular item, but the full implications must be understood and carefully weighed before choosing a different course.
> 4. **SHOULD NOT** This phrase, or the phrase "NOT RECOMMENDED" mean that there may exist valid reasons in particular circumstances when the particular behavior is acceptable or even useful, but the full implications should be understood and the case carefully weighed before implementing any behavior described with this label.
> 5. **MAY**   This word, or the adjective "OPTIONAL", mean that an item is truly optional. An implementation which does not include a particular option MUST be prepared to interoperate with another implementation which does include the option, though perhaps with reduced functionality. In the same vein an implementation which does include a particular option MUST be prepared to interoperate with another implementation which does not include the option (except, of course, for the feature the option provides.)
