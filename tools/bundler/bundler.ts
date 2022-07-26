#!/usr/bin/env node
// @ts-nocheck
'use strict'

import dirCommand from '@swc/cli/lib/swc/dir'
import fileCommand from '@swc/cli/lib/swc/file'
import parseArgs, { initProgram } from '@swc/cli/lib/swc/options'
import childProcess from 'child_process'
import fse from 'fs-extra'
import { promisify } from 'util'
import * as path from 'path'

const packageRoot = process.cwd()

const tsconfigPath = path.join(packageRoot, 'tsconfig.json')

const exec = promisify(childProcess.exec)

const buildTypes = async () => {
  if (!fse.existsSync(tsconfigPath)) {
    throw new Error(
      'Unable to find a tsconfig to build this project. ' +
        `The package root needs to contain a 'tsconfig.build.json'. ` +
        `The package root is '${packageRoot}'`,
    )
  }
  await exec(['yarn', 'tsc', '--declaration', '--emitDeclarationOnly'].join(' '))
}

initProgram()
const opts = parseArgs(process.argv)
const fn = opts.cliOptions.outDir ? dirCommand : fileCommand

process.on('uncaughtException', function (err) {
  console.error(err)
  process.exit(1)
})

fn(opts)
  .then(async () => {
    await buildTypes()
  })
  .catch((err: Error) => {
    console.error(err)
    process.exit(1)
  })
