import { Tree } from '@nx/devkit'

export default async function (tree: Tree, schema: any){
    console.log(tree)
    console.log(schema)
}

// todo: make a generator that can make a vue 3 component, composable or plugin