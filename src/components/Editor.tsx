import { useActiveCode, useSandpack } from '@codesandbox/sandpack-react'
import MonacoEditor, { useMonaco } from '@monaco-editor/react'
import { useEffect } from 'react'
import * as ts from 'typescript'

export default function Editor() {
	const { code, updateCode } = useActiveCode()
	const { sandpack } = useSandpack()
	const monaco = useMonaco()

	useEffect(() => {
		if (monaco) {
			monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
				target: monaco.languages.typescript.ScriptTarget.ES2016,
				allowNonTsExtensions: true,
				noEmit: true,
				moduleResolution: ts.ModuleResolutionKind.NodeNext,
				types: ['three', 'three-stdlib', 'stats.js'],
			})
		}
	}, [monaco])

	return (
		<MonacoEditor
			height="100%"
			width="100%"
			theme="vs-dark"
			defaultLanguage={getLanguage(sandpack.activeFile)}
			key={sandpack.activeFile}
			defaultValue={code}
			onChange={(value) => updateCode(value ?? '')}
		/>
	)
}

function getLanguage(fileName: string) {
	const ext = fileName.split('.').pop()
	switch (ext) {
		case 'json':
			return 'json'
		case 'js':
			return 'javascript'
		case 'ts':
			return 'typescript'
		case 'css':
			return 'css'
		case 'html':
			return 'html'
	}
}
