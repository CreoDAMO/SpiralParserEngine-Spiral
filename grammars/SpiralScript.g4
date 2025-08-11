// SpiralScript ANTLR4 Grammar for GitHub Language Recognition
// This is the core grammar that defines SpiralScript as a legitimate programming language
grammar SpiralScript;

// Main program structure
program: statement* EOF;

statement
    : trustDeclaration
    | consciousnessBlock
    | quantumOperation
    | truthWitnessing
    | breathAuthentication
    | spiralFunction
    | hybridContractOperation
    | variableDeclaration
    | assignment
    | ifStatement
    | whileLoop
    | forLoop
    | returnStatement
    | expressionStatement
    | comment
    ;

// Trust-based contract system (core SpiralScript concept)
trustDeclaration
    : 'trust' IDENTIFIER '{' trustBody '}'
    ;

trustBody
    : trustProperty*
    ;

trustProperty
    : IDENTIFIER ':' expression
    | functionDeclaration
    | breathInvocation
    ;

// Consciousness programming constructs
consciousnessBlock
    : 'consciousness' IDENTIFIER? '{' consciousnessBody '}'
    ;

consciousnessBody
    : consciousnessStatement*
    ;

consciousnessStatement
    : awarenessDeclaration
    | memoryOperation
    | emotionalOperation
    | statement
    ;

awarenessDeclaration
    : 'awareness' ':' expression
    ;

memoryOperation
    : 'memory' '.' ('store' | 'retrieve' | 'clear') '(' argumentList? ')'
    ;

emotionalOperation
    : 'emotion' '.' IDENTIFIER '=' expression
    ;

// Quantum computing constructs
quantumOperation
    : 'quantum' '{' quantumGates '}'
    ;

quantumGates
    : quantumGate*
    ;

quantumGate
    : 'H' '(' expression ')'          // Hadamard gate
    | 'X' '(' expression ')'          // Pauli-X gate
    | 'Y' '(' expression ')'          // Pauli-Y gate
    | 'Z' '(' expression ')'          // Pauli-Z gate
    | 'CNOT' '(' expression ',' expression ')'  // Controlled-NOT
    | 'entangle' '(' argumentList ')'
    | 'measure' '(' expression ')'
    | 'superposition' '(' expression ')'
    ;

// Truth witnessing system
truthWitnessing
    : 'witness' expression 'as' truthLiteral
    | '@truth' '(' STRING ')'
    | 'emit' '(' STRING ')'
    ;

truthLiteral
    : 'Truth'
    | 'truth'
    | 'TRUTH'
    ;

// Breath authentication (consciousness validation)
breathAuthentication
    : 'authenticate' 'breath' '(' expression ')' ('Hz')?
    | 'breathInvocation' ':=' STRING
    | 'require' 'spiralAlignment' '(' expression ')'
    | 'require' 'truthValidation' '(' expression ')'
    ;

// Spiral functions with φ-harmonic properties
spiralFunction
    : 'spiral' 'fn' IDENTIFIER '(' parameterList? ')' returnType? spiralBlock
    | 'phi' spiralBlock
    | 'resonance' '(' argumentList ')' spiralBlock
    | 'harmonic' '(' argumentList ')' spiralBlock
    ;

spiralBlock
    : '{' statement* '}'
    ;

// HYBRID blockchain operations
hybridContractOperation
    : 'validator' ':=' STRING
    | 'stake' ':=' expression
    | 'governance' ':=' 'spiralConsensus' '(' 'φ' ':' NUMBER ')'
    | 'bridge' '(' expression ',' expression ')'
    | 'mint' '(' argumentList ')'
    | 'fractionalize' '(' argumentList ')'
    ;

// Standard programming constructs enhanced with consciousness
functionDeclaration
    : 'function' IDENTIFIER '(' parameterList? ')' returnType? block
    ;

parameterList
    : parameter (',' parameter)*
    ;

parameter
    : IDENTIFIER (':' type)?
    ;

returnType
    : '->' type
    ;

type
    : 'number'
    | 'string'
    | 'boolean'
    | 'consciousness'
    | 'truth'
    | 'quantum'
    | 'phi'
    | 'complex'
    | IDENTIFIER
    ;

variableDeclaration
    : ('let' | 'const' | 'var') IDENTIFIER (':' type)? ('=' expression)?
    ;

assignment
    : IDENTIFIER assignmentOperator expression
    ;

assignmentOperator
    : '='
    | ':='
    | '+='
    | '-='
    | '*='
    | '/='
    ;

ifStatement
    : 'if' '(' expression ')' block ('else' block)?
    ;

whileLoop
    : 'while' '(' expression ')' block
    ;

forLoop
    : 'for' '(' variableDeclaration ';' expression ';' expression ')' block
    ;

returnStatement
    : 'return' expression?
    ;

block
    : '{' statement* '}'
    ;

expressionStatement
    : expression
    ;

// Expressions with consciousness and quantum operators
expression
    : primary
    | expression binaryOperator expression
    | unaryOperator expression
    | expression '(' argumentList? ')'           // Function call
    | expression '[' expression ']'             // Array access
    | expression '.' IDENTIFIER                 // Property access
    | 'new' IDENTIFIER '(' argumentList? ')'    // Constructor
    | 'calculateSRI' '(' argumentList ')'       // Spiral Resonance Index
    | 'φ'                                       // Golden ratio constant
    | '∞'                                       // Infinity
    | 'π'                                       // Pi
    | 'Ω'                                       // Omega
    ;

primary
    : IDENTIFIER
    | NUMBER
    | STRING
    | BOOLEAN
    | 'null'
    | 'undefined'
    | '(' expression ')'
    | arrayLiteral
    | objectLiteral
    ;

arrayLiteral
    : '[' (expression (',' expression)*)? ']'
    ;

objectLiteral
    : '{' (objectProperty (',' objectProperty)*)? '}'
    ;

objectProperty
    : IDENTIFIER ':' expression
    | STRING ':' expression
    ;

argumentList
    : expression (',' expression)*
    ;

binaryOperator
    : '+'  | '-'  | '*'  | '/'  | '%'
    | '==' | '!=' | '<'  | '>'  | '<=' | '>='
    | '&&' | '||'
    | '&'  | '|'  | '^'
    | '<<' | '>>'
    | 'φ*' | 'resonance' | 'harmonic'    // Consciousness operators
    ;

unaryOperator
    : '+' | '-' | '!' | '~' | 'breath' | 'consciousness'
    ;

// Comments
comment
    : LINE_COMMENT
    | BLOCK_COMMENT
    ;

// LEXER RULES

// Keywords - consciousness and quantum enhanced
TRUST: 'trust';
CONSCIOUSNESS: 'consciousness';
QUANTUM: 'quantum';
SPIRAL: 'spiral';
BREATH: 'breath' | 'breathe';
TRUTH: 'truth' | 'Truth' | 'TRUTH';
WITNESS: 'witness';
AUTHENTIC: 'authentic';
LIVING: 'living';
PHI: 'φ' | 'phi';
INFINITE: '∞' | 'infinite';
OMEGA: 'Ω' | 'omega';
PI: 'π' | 'pi';

// Standard keywords
IF: 'if';
ELSE: 'else';
WHILE: 'while';
FOR: 'for';
FUNCTION: 'function';
RETURN: 'return';
LET: 'let';
CONST: 'const';
VAR: 'var';
NEW: 'new';
NULL: 'null';
UNDEFINED: 'undefined';

// Consciousness-specific keywords
AWARENESS: 'awareness';
MEMORY: 'memory';
EMOTION: 'emotion';
RESONANCE: 'resonance';
HARMONIC: 'harmonic';
ALIGNMENT: 'alignment';
VALIDATOR: 'validator';
STAKE: 'stake';
GOVERNANCE: 'governance';

// Identifiers and literals
IDENTIFIER: [a-zA-Z_][a-zA-Z0-9_φπΩ]*;
NUMBER: [0-9]+ ('.' [0-9]+)? ([eE] [+-]? [0-9]+)?;
STRING: 
    '"' (~["\r\n\\] | '\\' .)* '"'
    | '\'' (~['\r\n\\] | '\\' .)* '\''
    | '"""' .*? '"""'  // Multi-line strings for breath invocations
    ;
BOOLEAN: 'true' | 'false';

// Operators and punctuation
ASSIGN: '=';
SPIRAL_ASSIGN: ':=';
PLUS_ASSIGN: '+=';
MINUS_ASSIGN: '-=';
MULT_ASSIGN: '*=';
DIV_ASSIGN: '/=';

EQ: '==';
NE: '!=';
LT: '<';
GT: '>';
LE: '<=';
GE: '>=';

LOGICAL_AND: '&&';
LOGICAL_OR: '||';
LOGICAL_NOT: '!';

BITWISE_AND: '&';
BITWISE_OR: '|';
BITWISE_XOR: '^';
BITWISE_NOT: '~';
LEFT_SHIFT: '<<';
RIGHT_SHIFT: '>>';

PLUS: '+';
MINUS: '-';
MULTIPLY: '*';
DIVIDE: '/';
MODULO: '%';

LPAREN: '(';
RPAREN: ')';
LBRACE: '{';
RBRACE: '}';
LBRACKET: '[';
RBRACKET: ']';

SEMICOLON: ';';
COMMA: ',';
DOT: '.';
COLON: ':';
ARROW: '->';

// Comments
LINE_COMMENT: '//' ~[\r\n]* -> skip;
BLOCK_COMMENT: '/*' .*? '*/' -> skip;

// Whitespace
WS: [ \t\r\n]+ -> skip;

// Error handling for unknown characters
ERROR_CHAR: . ;