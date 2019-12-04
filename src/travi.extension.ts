import * as vscode from 'vscode';

const TRAVI = `Когда мне было 15 лет, и я ходил срать бятя всё время как-бы невзначай крутился возле толчка, и всё спрашивал, что ты там затих, почему тебя не слышно? первый раз я не ответил, так он начал ломиться в дверь, и орать, что ты там молчишь, что с тобой? начал материться, и говорить, что вообще дверь с петель снимет, алсо, батя ругался, если я сру и не смываю, причём не просто вконце срания, а непосредственно после вылезания какашки, мотивировал это тем, что воняет, и сам потом мне говорил: вот я какну и смываю, и ты так делай! однажды я срать сел, и слышу, батя где-то у двери встал в отдалении, ну я жопу вытер, и на пол накарачики присел, а там щель очень широкая снизу у двери, ну я в щель и смотрю, а там батя на карачиках сидит и в щель смотрит, и мне говорит: ты чё? ебанутый? чё ты там делаешь? батя кстати всё время какие-то травы пьёт, чтобы срать часто, срёт по 5 раз в день, а потом говорит, что жопу жжёт, и ещё пердит он. пиздец короче! реальная история. я не тролль.`;

const COMMAND: string = 'travi';
const SPLITED_ARRAY: string[] = TRAVI.split(' ');

/**
 * Extracts number of words after a keyword
 * @param document vscode document
 * @param position position of cursor
 */
export const extractNumber = (document: vscode.TextDocument, position: vscode.Position): number => {

    /**
     * Deletes the keyword (COMMAND) from the last match on the line to avoid dealing with multiple 
     * occurances of the keyword
     * @param matchGroup result of string.match with given regexp
     */
    const replaceKeywordFromLastGroup = (matchGroup: RegExpMatchArray): number => {
        return parseInt(matchGroup[matchGroup.length-1].replace(COMMAND, ''));
    };

    const line: string = document.lineAt(position).text;
    const regexp: RegExp = new RegExp(`(${COMMAND}([^\sa-zA-Z]*))`, 'gis');
    const matchGroup: RegExpMatchArray | null = line.match(regexp);
    return matchGroup !== null ? replaceKeywordFromLastGroup(matchGroup) : 0;
};

/**
 * Removes punctuation from the end of given text 
 * @param text string to be cut
 */
export const removeLastPunctuationMark = (text: string): string => {
    const regex: RegExp = new RegExp('[,?!]');
    return regex.test(text[text.length-1]) ? text.slice(0,-1) : text;
};

/**
 * Generates text with given number of words
 * @param wordCount number of words to generate
 */
export const generateText = (wordCount: number): string => {

    /**
     * Recursively generates an array with length granter than given word count
     * @param wordCount number of words splited array must be greater than
     * @param splitedArray array to be recursively added to itself
     */
    const textRepeater = (wordCount: number, splitedArray: string[]): string[] => {
        splitedArray = splitedArray.concat(splitedArray);
        return wordCount > splitedArray.length ? textRepeater(wordCount, splitedArray) : splitedArray;
    };

    const localArray: string[] = SPLITED_ARRAY.length < wordCount ? textRepeater(wordCount, SPLITED_ARRAY) : SPLITED_ARRAY;
    const rawText: string = localArray.slice(0, wordCount).join(' ');
    return removeLastPunctuationMark(rawText);
};

export function activate(context: vscode.ExtensionContext) {

	const provider = vscode.languages.registerCompletionItemProvider('*', {
		
		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
			const completionItem = new vscode.CompletionItem(COMMAND);
            const wordCount: number = extractNumber(document, position);
            const generatedText: string = generateText(wordCount);
            
            completionItem.label = `${COMMAND}${wordCount || ''}`;
            completionItem.insertText = generatedText;

            return [completionItem];
		}
	}, '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'i');
	context.subscriptions.push(provider);
} 