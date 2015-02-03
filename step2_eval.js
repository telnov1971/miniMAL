function eval_ast(ast, env) {
    return Array.isArray(ast)
        ? ast.map(function(e){return EVAL(e, env);}) // list
        : (typeof ast == "string")                  // symbol
            ? ast in env
                ? env[ast]                           // lookup symbol
                : null[ast]                          // undefined symbol
            : ast;                                   // just return ast
}

function EVAL(ast, env) {
    //console.log("EVAL:", ast);
    if (!Array.isArray(ast)) return eval_ast(ast, env);

    // apply
    var el = eval_ast(ast, env), f = el[0];
    return f.apply(f, el.slice(1))
}

E = {};
E["+"]     = function(a,b) { return a+b; }
E["-"]     = function(a,b) { return a-b; }
E["*"]     = function(a,b) { return a*b; }
E["/"]     = function(a,b) { return a/b; }

//
// Node specific
//
function rep(a,A,B,C) { return JSON.stringify(EVAL(JSON.parse(a),E)); }
require('repl').start({
    prompt: "user> ",
    ignoreUndefined: true,
    eval: function(l,c,f,cb) { console.log(rep(l.slice(1,l.length-2))); cb() }
});