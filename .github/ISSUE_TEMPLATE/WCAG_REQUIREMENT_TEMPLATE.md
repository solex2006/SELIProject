---
name: WCAG Requirement
about: Use this template for create a WCAG requiremment.
labels: REQUIREMENT, {a11y}
title: REQ_WCAG_X.Y.Z SUBJECT
---
<!--- General description --->

## Intent

## Examples
1.
2.

## Referenced Requirements
<!--- Reference requirements that should be meet together --->
<!--- Reference requirements that replace this requiremebt --->

## Sufficient Techniques

> Sufficient techniques are reliable ways to meet the success criteria.
> - From an author's perspective: If you use the sufficient techniques for a given criterion correctly and it is accessibility-supported for your users, you can be confident that you met the success criterion.
> - From an evaluator's perspective: If web content implements the sufficient techniques for a given criterion correctly and it is accessibility-supported for the content's users, it conforms to that success criterion. (The converse is not true; if content does not implement these sufficient techniques, it does not necessarily fail the success criteria, as explained in Testing Techniques below.)
> There may be other ways to meet success criteria besides the sufficient techniques in W3C's Techniques for WCAG document, as Other Techniques below. (See also Techniques are Informative above.)

<!-- OR list -->
- IDx
- IDy

### [ID: NAME](LINK TO)
> DESCRIPTION

**Example**

#### Test Procedure

1. 
2. 
3. 
4. 
5. 

**Expected Results**
<!--- Based on test procedure, what's the expected result to success --->

### [ID: NAME](LINK TO)
> DESCRIPTION

**Example**

#### Test Procedure

1. 
2. 
3. 
4. 
5. 

**Expected Results**
<!--- Based on test procedure, what's the expected result to success --->

## Advisory Techniques

> Advisory techniques are suggested ways to improve accessibility. They are often very helpful to some users, and may be the only way that some users can access some types of content.
> Advisory techniques are not designated as sufficient techniques for various reasons such as:
> - they may not be sufficient to meet the full requirements of the success criteria;
> - they may be based on technology that is not yet stable;
> - they may not be accessibility supported in many cases (for example, assistive technologies do not work with them yet);
> - they may not be testable;
> - in some circumstances they may not be applicable or practical, and may even decrease accessibility for some users while increasing it for others;
> - they may not address the success criterion itself, and instead provide related accessibility benefits.
> Authors are encouraged to apply all of the techniques where appropriate to best address the widest range of users' needs.

### [ID: NAME](LINKTO)
> DESCRIPTION

> :exclamation: IMPLEMENTATION ALERT

**Example**

#### Test Procedure

1. 
2. 
3. 
4. 
5. 

**Expected Results**
<!--- Based on test procedure, what's the expected result to success --->

### [ID: NAME](LINKTO)
> DESCRIPTION

> :exclamation: IMPLEMENTATION ALERT

**Example**

#### Test Procedure

1. 
2. 
3. 
4. 
5. 

**Expected Results**
<!--- Based on test procedure, what's the expected result to success --->

# SELI CONTEXT

## Tasks
List the tasks required to accomplish the requirement (not exhaustive)
<!--- Not required, but agroup by modules or functions --->

- [ ] **SYSTEM** MUST ...
- [ ] **TEACHER** MUST ...
- [ ] **STUDENT** MUST ...

# Suggested implementation

```

```
# Resources
<!--- resources to help implement / understadment of some technique --->

# :notebook_with_decorative_cover: References

- [How to Meet WCAG (Quick Reference)](https://www.w3.org/WAI/WCAG21/quickref)
- [Understanding Techniques for WCAG Success Criteria](https://www.w3.org/WAI/WCAG21/Understanding/understanding-techniques)

# GLOSSARY 
- SELI's content: all contents not created by users (e.g. seli "about" section text)

:warning: The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED",  "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119/8174](http://www.rfc-editor.org/info/rfc8174).
> 1. **MUST** This word, or the terms "REQUIRED" or "SHALL", mean that the definition is an absolute requirement of the specification.
> 2. **MUST NOT** This phrase, or the phrase "SHALL NOT", mean that the definition is an absolute prohibition of the specification.
> 3. **SHOULD** This word, or the adjective "RECOMMENDED", mean that there may exist valid reasons in particular circumstances to ignore a particular item, but the full implications must be understood and carefully weighed before choosing a different course.
> 4. **SHOULD NOT** This phrase, or the phrase "NOT RECOMMENDED" mean that there may exist valid reasons in particular circumstances when the particular behavior is acceptable or even useful, but the full implications should be understood and the case carefully weighed before implementing any behavior described with this label.
> 5. **MAY**   This word, or the adjective "OPTIONAL", mean that an item is truly optional. An implementation which does not include a particular option MUST be prepared to interoperate with another implementation which does include the option, though perhaps with reduced functionality. In the same vein an implementation which does include a particular option MUST be prepared to interoperate with another implementation which does not include the option (except, of course, for the feature the option provides.)
