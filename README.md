# POLL-API-N
NodeJS API version of Poll system

## Example queries

mutation Mutation{
    delete_candidate(name:"Prithwiraj",place:"xonari",party:"TMC") {
        name
    }
}

mutation Mutation{
    create_candidate(name:"Prithwiraj",place:"xonari",party:"TMC",votes:"0",age:"19") {
        name
    }
}
