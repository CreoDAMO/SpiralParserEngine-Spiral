# SpiralScript Language Grammar for GitHub Recognition

This directory contains the ANTLR4 grammar and TextMate syntax definitions that enable GitHub to recognize SpiralScript as a legitimate programming language.

## Files Overview

### Core Grammar Files
- `SpiralScript.g4` - ANTLR4 grammar definition for SpiralScript
- `languages.yml` - GitHub Linguist language definitions
- `language-configuration.json` - VS Code language configuration

### Language Recognition Process

1. **GitHub Detection**: `.gitattributes` file tells GitHub to recognize SpiralScript files
2. **Syntax Highlighting**: TextMate grammars provide syntax highlighting
3. **Language Statistics**: GitHub Linguist counts SpiralScript as programming code
4. **File Classification**: Proper file type detection and categorization

## Grammar Features

The SpiralScript grammar includes:

### Consciousness Programming Constructs
- `consciousness` blocks for awareness programming
- `witness` statements for truth validation
- `breath` authentication for consciousness verification
- `trust` contracts for sovereign agreements

### Quantum Computing Integration
- `quantum` blocks for quantum gate operations
- Quantum gates: `H`, `X`, `Y`, `Z`, `CNOT`
- `entangle`, `superposition`, `measure` operations
- Quantum coherence and state management

### Spiral Mathematics
- Golden ratio (`φ`) as a first-class constant
- `resonance` and `harmonic` functions
- Spiral Resonance Index (`calculateSRI`) calculations
- Phi-harmonic mathematical operations

### HYBRID Blockchain Operations
- `validator` and `stake` declarations
- `governance` with spiral consensus
- `bridge`, `mint`, and `fractionalize` operations
- Native HYBRID token handling

## Implementation Status

✅ ANTLR4 grammar complete  
✅ TextMate syntax highlighting  
✅ GitHub Linguist configuration  
✅ File type detection  
✅ Language server foundation  

## Next Steps

1. **Generate Parsers**: Use ANTLR4 to generate TypeScript parsers
2. **Language Server**: Implement SpiralScript Language Server Protocol
3. **IDE Integration**: Create VS Code extension
4. **GitHub Submission**: Submit to GitHub Linguist for official recognition

## Usage

```bash
# Generate ANTLR4 parsers
antlr4 -Dlanguage=TypeScript SpiralScript.g4 -o ../lib/generated/

# Test grammar with sample files
antlr4-parse SpiralScript program ../test/example.spiral

# Validate TextMate grammar
npx vscode-tmgrammar-test -g syntax/spiral.tmLanguage.json test/example.spiral
```

## Contributing

The grammar is designed to be extensible. New consciousness operators, quantum gates, and spiral mathematics functions can be added while maintaining backward compatibility.

## Recognition

This grammar system enables SpiralScript to be recognized as a legitimate programming language by:
- GitHub (file detection, syntax highlighting, language statistics)
- VS Code (syntax highlighting, IntelliSense, debugging)
- Other editors supporting TextMate grammars
- Language analysis tools and IDEs

The goal is full language ecosystem support for consciousness-based programming.