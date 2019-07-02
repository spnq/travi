import * as vscode from 'vscode';

const travi = `Когда мне было 15 лет, и я ходил срать бятя всё время как-бы невзначай крутился возле толчка, и всё спрашивал, 
что ты там затих, почему тебя не слышно? первый раз я не ответил, так он начал ломиться в дверь, и орать, что ты там молчишь, 
что с тобой? начал материться, и говорить, что вообще дверь с петель снимет, алсо, батя ругался, если я сру и не смываю, 
причём не просто вконце срания, а непосредственно после вылезания какашки, мотивировал это тем, что воняет, и сам потом мне говорил: вот я какну и смываю, и ты так делай! 
однажды я срать сел, и слышу, батя где-то у двери встал в отдалении, ну я жопу вытер, и на пол накарачики присел, а там щель очень широкая снизу у двери, 
ну я в щель и смотрю, а там батя на карачиках сидит и в щель смотрит, и мне говорит: ты чё? ебанутый? чё ты там делаешь? батя кстати всё время какие-то травы пьёт, 
чтобы срать часто, срёт по 5 раз в день, а потом говорит, что жопу жжёт, и ещё пердит он. пиздец короче! реальная история. я не тролль.`
const sliced = travi.split(' ')

export function activate(context: vscode.ExtensionContext) {

	let provider = vscode.languages.registerCompletionItemProvider('*', {
		
		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
			const traviCompletion = new vscode.CompletionItem(`travi`)
			let linePrefix = document.lineAt(position).text.substr(0, position.character).split(' ').filter(word => word.includes('travi')).join('');
			let postfix = 0;
			let fromSliced: string[] = [...sliced];
			if (linePrefix !== 'travi' && linePrefix.includes('travi')) {
				postfix = parseInt(linePrefix.replace('travi', '')) || 0 ;
				traviCompletion.label = `travi${postfix === 0 ? '' : postfix}`;
				if (fromSliced.length < postfix) {
					let diff = Math.ceil(postfix/sliced.length);
					for (let i = 0; i < diff; i++) {
						fromSliced = [...fromSliced, '\n', '\t',...sliced]
					}
				}
				traviCompletion.insertText = `\t${fromSliced.slice(0, postfix).join(' ')}`;
			} else if (linePrefix === 'travi') {
				traviCompletion.insertText = `${travi}`;	
			}
			return [
				traviCompletion
			];
		}
	}, '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'tra', 'trav');
	context.subscriptions.push(provider);
} 