/**
 * /
 * @param {[HTML]} _html [description]
 * @param {[Data]} data  [description]
 * re=>正则标签
 * jsRe=>正则js
 * code=>存储命令+换行
 * index=>保存只想文档的charAt
 * addCode=>判断是否为要转换
 */
var Temp = function( _html , data ) {
    var re = /{{([^{}]+)}}/g,
        code = 'var r=[];\n',
        jsRe = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
        index = 0;
    var addCode = function(line , js) {
        js ? code += line.match(jsRe) ? line + '\n' : 'r.push(' + line + ');\n' :
            code += 'r.push("' + line.replace(/"/g , '\\"') + '");\n';
    }

    while( match = re.exec(_html) ) {
        addCode( _html.slice( index , match.index ) );	//将不用转换的直接push
        addCode( match[1] , true );						//语言做匹配转换
        index = match.index + match[0].length;			//索引指向匹配值尾部
    }
    addCode( _html.substr(index, _html.length - index) );
    code += 'return r.join("");';
    return new Function( code.replace(/[\n]/g,'') ).apply(data);
};

var _html1 = '<p>my name is {{this.name}} , I\'m {{this.profile.age}} years old</p>';
console.log( Temp( _html1 , {
    name: 'isildur',
    profile: {age:29}
}));
function MJ(argument) {
	// body...
}