"use strict";

const { watch, promises: { readFile } } = require("node:fs");

class File {
	watch(event, filename) {
		console.log("this", this);
		console.log("arguments", Array.prototype.slice.call(arguments));
		this.showContent(filename);
	}

	async showContent() {
		console.log((await readFile(filename)).toString());
	}
}

const file = new File();

// dessa forma, ele ignora o "this" da classe File
// herda o this do watch
// watch(__filename, file.watch);

// altertiva para não herdar o this da função
// mas fica feio!
// wath(__filename, (event, filename) => file.watch(event, filename));

// podemos deixar explicito qual é o contexto que a função deve seguir
// o bind retorna uma nova função com o "this" que se mantém de filçe, ignorando o watch
// watch(__filename, file.watch.bind(file));

// file.watch.call({ showContent: () => console.log("Call: Hey!") }, null, __filename);
file.watch.apply({ showContent: () => console.log("Apply: Hey!") }, [null, __filename]);