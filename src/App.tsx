import { SandpackFiles, SandpackLayout, SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react'
import { Allotment } from 'allotment'
import 'allotment/dist/style.css'
import Editor from './components/Editor'

function App() {
	const files: SandpackFiles = {
		'index.ts': {
			code: `
			import "./styles.css";
			import * as THREE from "three";
			import { OrbitControls } from "three-stdlib";
			import Stats from "stats.js";
			
			const viewport = {
			  width: window.innerWidth,
			  height: window.innerHeight
			};
			
			const root = document.getElementById("app");
			
			const scene = new THREE.Scene();
			window.addEventListener("resize", resize);
			
			const fov = 50;
			const camera = new THREE.PerspectiveCamera(
			  fov,
			  viewport.width / viewport.height
			);
			camera.position.set(1, 2, 5);
			
			const renderer = new THREE.WebGLRenderer({ antialias: true });
			renderer.setSize(viewport.width, viewport.height);
			renderer.setAnimationLoop(update);
			renderer.setClearColor("#151515");
			root?.appendChild(renderer.domElement);
			
			const orbit = new OrbitControls(camera, renderer.domElement);
			orbit.enableDamping = true;
			
			const stats = new Stats();
			root?.appendChild(stats.dom);
			
			const grid = new THREE.GridHelper();
			scene.add(grid);
			
			const box = new THREE.Mesh(
			  new THREE.BoxGeometry(1, 1, 1),
			  new THREE.MeshNormalMaterial()
			);
			box.position.y = 0.5;
			scene.add(box);
			
			function update() {
			  stats.update();
			  orbit.update();
			  renderer.render(scene, camera);
			}
			
			function resize() {
			  viewport.width = window.innerWidth;
			  viewport.height = window.innerHeight;
			
			  camera.aspect = viewport.width / viewport.height;
			  camera.updateProjectionMatrix();
			
			  renderer.setSize(viewport.width, viewport.height);
			  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			}
			
			`,
		},
		'styles.css': {
			code: `:root {
				font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
				line-height: 1.5;
				font-weight: 400;
			
				font-synthesis: none;
				text-rendering: optimizeLegibility;
				-webkit-font-smoothing: antialiased;
				-moz-osx-font-smoothing: grayscale;
				-webkit-text-size-adjust: 100%;
			}
			
			*,
			*::before,
			*::after {
				box-sizing: border-box;
				margin: 0;
				padding: 0;
			}
			
			html,
			body {
				height: 100%;
				width: 100%;
				overflow: hidden;
			}
			
			#app {
				position: fixed;
				inset: 0;
			}
			
			canvas {
				display: block;
				outline: none;
			}`,
		},
		'package.json': {
			code: `{
				"dependencies": {
				  "three": "^0.158.0",
				  "three-stdlib": "^2.28.5",
				  "gsap": "^3.12.2",
				  "tweakpane": "^4.0.1",
				  "stats.js": "^0.17.0"
				},
				"main": "/index.js",
				"devDependencies": {
				   "@tweakpane/core": "^2.0.1",
				  "@types/stats.js": "^0.17.3",
				  "@types/three": "^0.158.2",
				  "typescript": "^5.0.2"
				}
			  }`,
		},
	}

	return (
		<SandpackProvider template="vanilla-ts" theme="dark" files={files}>
			<SandpackLayout className="!rounded-none h-screen">
				<Allotment>
					<Allotment.Pane minSize={300}>
						{/* <SandpackFileExplorer /> */}
						<Editor />
					</Allotment.Pane>
					<Allotment.Pane snap minSize={300}>
						<SandpackPreview
							className="!h-full"
							// showOpenInCodeSandbox={false}
							showRefreshButton
							showSandpackErrorOverlay
							showOpenNewtab={false}
						/>
					</Allotment.Pane>
				</Allotment>
			</SandpackLayout>
		</SandpackProvider>
	)
}

export default App
