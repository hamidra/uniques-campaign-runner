#!/usr/bin/env node

const { Command } = require('commander');
const { runWorkflow } = require('./workflow/workflow');
const program = new Command();

program.version('0.0.1');

program
  .argument(`<workflow-config>`, 'the workflow configuration file')
  .option('--dry-run', 'Enable dry-run')
  .action(async (workflowConfig, options) => {
    await runWorkflow(workflowConfig, options.dryRun ?? false);
    console.log('\ndone!');
  });

program
  .parseAsync(process.argv)
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err?.message ?? err);
    process.exit(1);
  });
