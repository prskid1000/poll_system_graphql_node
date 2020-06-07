const Express = require("express");
const ExpressGraphQL = require("express-graphql");
const Mongoose = require("mongoose");
const mongoose = require('mongoose');
const db=require("./db");
const {
   GraphQLID,
   GraphQLString,
   GraphQLList,
   GraphQLNonNull,
   GraphQLObjectType,
   GraphQLSchema
} = require("graphql");

var CandidateSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },

  party: {
    type: String,
    trim: true
  },

  place: {
    type: String,
    trim: true
  },

  age: {
    type: String,
    trim: true
  },

  votes: {
    type: String,
    trim: true
  }

});

var CandidateModel = mongoose.model('Candidate', CandidateSchema);
var VoterSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  party_prefered: {
    type: String,
    trim: true
  },
  place: {
    type: String,
    trim: true
  },
  age: {
    type: String,
    trim: true
  }
});

var VoterModel = mongoose.model('Voter', VoterSchema);
var AreaSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  winning_party: {
    type: String,
    trim: true
  },
  winner: {
    type: String,
    trim: true
  },
  opposition_party: {
    type: String,
    trim: true
  },
  opposition: {
    type: String,
    trim: true
  }
});

var AreaModel = mongoose.model('Area', AreaSchema);

const CandidateType = new GraphQLObjectType({
   name: "Candidate",
   fields: {
       id: { type: GraphQLID },
       name: { type: GraphQLString },
       party: { type: GraphQLString },
       place: { type: GraphQLString },
       age: { type: GraphQLString },
       votes:{ type: GraphQLString },
   }
});
const VoterType = new GraphQLObjectType({
   name: "Voter",
   fields: {
       id: { type: GraphQLID },
       name: { type: GraphQLString },
       party_prefered: { type: GraphQLString },
       place: { type: GraphQLString },
       age: { type: GraphQLString },
   }
});
const AreaType = new GraphQLObjectType({
   name: "Area",
   fields: {
       id: { type: GraphQLID },
       name: { type: GraphQLString },
       winning_party: { type: GraphQLString },
       winner: { type: GraphQLString },
       opposition_party: { type: GraphQLString },
       opposition:{ type: GraphQLString },
   }
});

var app = Express();

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            candidate_by_name: {
                type: CandidateType,
                args: {
                      name: { type: GraphQLNonNull(GraphQLString) }
                },
                resolve: (root, args, context, info) => {
                    return CandidateModel.findOne({ "name":args['name']}).exec();
                }
            },
            candidate_by_party: {
                type: CandidateType,
                args: {
                  party: { type: GraphQLNonNull(GraphQLString) }
                },
                resolve: (root, args, context, info) => {
                    return CandidateModel.findOne({ "party":args['party']}).exec();
                }
            },
            candidate_by_place: {
                type: CandidateType,
                args: {
                  place: { type: GraphQLNonNull(GraphQLString) }
                },
                resolve: (root, args, context, info) => {
                    return CandidateModel.findOne({ "place":args['place']}).exec();
                }
            },
            candidate_by_age: {
                type: CandidateType,
                args: {
                  age: { type: GraphQLNonNull(GraphQLString) }
                },
                resolve: (root, args, context, info) => {
                    return CandidateModel.findOne({ "age":args['age']}).exec();
                }
            },
            voter_by_name: {
                type: VoterType,
                args: {
                      name: { type: GraphQLNonNull(GraphQLString) }
                },
                resolve: (root, args, context, info) => {
                    return VoterModel.findOne({ "name":args['name']}).exec();
                }
            },
            voter_by_party_prefered: {
                type: VoterType,
                args: {
                    party: { type: GraphQLNonNull(GraphQLString) }
                },
                resolve: (root, args, context, info) => {
                    return VoterModel.findOne({ "party_prefered":args['party_prefered']}).exec();
                }
            },
            voter_by_place: {
                type: VoterType,
                args: {
                    place: { type: GraphQLNonNull(GraphQLString) }
                },
                resolve: (root, args, context, info) => {
                    return VoterModel.findOne({ "place":args['place']}).exec();
                }
            },
            voter_by_age: {
                type: VoterType,
                args: {
                    age: { type: GraphQLNonNull(GraphQLString) }
                },
                resolve: (root, args, context, info) => {
                    return VoterModel.findOne({ "age":args['age']}).exec();
                }
            },
            areas_by_name: {
                type: AreaType,
                args: {
                    name: { type: GraphQLNonNull(GraphQLString) }
                },
                resolve: (root, args, context, info) => {
                    return AreaModel.findOne({ "name":args['name']}).exec();
                }
            },
            areas_by_ruling_party: {
                  type: AreaType,
                  args: {
                      ruling_party: { type: GraphQLNonNull(GraphQLString) }
                  },
                  resolve: (root, args, context, info) => {
                      return AreaModel.findOne({ "ruling_party":args['ruling_party']}).exec();
                  }
              },
              areas_by_opposition_party: {
                type: AreaType,
                args: {
                    opposition_party: { type: GraphQLNonNull(GraphQLString) }
                },
                resolve: (root, args, context, info) => {
                    return AreaModel.findOne({ "opposition_party":args['opposition_party']}).exec();
                }
              }
        }
    }),

    mutation: new GraphQLObjectType({
        name: "Mutation",
        fields: {
            create_candidate: {
                type: CandidateType,
                args: {
                    name: { type: GraphQLNonNull(GraphQLString) },
                    place: { type: GraphQLNonNull(GraphQLString) },
                    party: { type: GraphQLNonNull(GraphQLString) },
                    age: { type: GraphQLNonNull(GraphQLString) },
                    votes: { type: GraphQLNonNull(GraphQLString) }
                },
                resolve: (root, args, context, info) => {
                    var candidate = new CandidateModel(args);
                    return candidate.save();
                }
            },
            update_candidate: {
                type: CandidateType,
                args: {
                  id: { type: GraphQLNonNull(GraphQLID) },
                  name: { type: GraphQLNonNull(GraphQLString) },
                  place: { type: GraphQLNonNull(GraphQLString) },
                  party: { type: GraphQLNonNull(GraphQLString) },
                  age: { type: GraphQLNonNull(GraphQLString) },
                  votes: { type: GraphQLNonNull(GraphQLString) }
                },
                resolve: (root, args, context, info) => {
                    CandidateModel.findById(args['id'],function(err,candidate){
                    candidate['name']=args['name'];
                    candidate['place']=args['party'];
                    candidate['age']=args['age'];
                    candidate['party']=args['party'];
                    candidate['votes']=args['votes'];
                    return candidate.save();
                  });

                }
             },
             delete_candidate: {
                 type: CandidateType,
                 args: {
                   name: { type: GraphQLNonNull(GraphQLString) },
                   place: { type: GraphQLNonNull(GraphQLString) },
                   party: { type: GraphQLNonNull(GraphQLString) },
                 },
                 resolve: (root, args, context, info) => {
                     var candidate = CandidateModel.findOne({"name":args['name'],"place":args['place'], "party":args['party']},function(err,doc){
                        CandidateModel.deleteMany({ "name":args['name'],"place":args['place'], "party":args['party']}).exec();
                     }).exec();
                     return candidate;
                 }
             },
             create_voter: {
                 type: VoterType,
                 args: {
                     name: { type: GraphQLNonNull(GraphQLString) },
                     place: { type: GraphQLNonNull(GraphQLString) },
                     party_prefered: { type: GraphQLNonNull(GraphQLString) },
                     age: { type: GraphQLNonNull(GraphQLString) },
                 },
                 resolve: (root, args, context, info) => {
                     var voter = new VoterModel(args);
                     return voter.save();
                 }
             },
             update_voter: {
                 type: VoterType,
                 args: {
                   id: { type: GraphQLNonNull(GraphQLID) },
                   name: { type: GraphQLNonNull(GraphQLString) },
                   place: { type: GraphQLNonNull(GraphQLString) },
                   party_prefered: { type: GraphQLNonNull(GraphQLString) },
                   age: { type: GraphQLNonNull(GraphQLString) },
                 },
                 resolve: (root, args, context, info) => {
                     VoterModel.findById(args['id'],function(err,voter){
                       voter['name']=args['name'];
                       voter['place']=args['party'];
                       voter['age']=args['age'];
                       voter['party_prefered']=args['party_prefered'];
                       return voter.save();
                     });
                 }
              },
              delete_voter: {
                  type: VoterType,
                  args: {
                    name: { type: GraphQLNonNull(GraphQLString) },
                    place: { type: GraphQLNonNull(GraphQLString) },
                    party_prefered: { type: GraphQLNonNull(GraphQLString) },
                  },
                  resolve: (root, args, context, info) => {
                      var voter =VoterModel.findOne({ "name":args['name'],"place":args['place'], "party_prefered":args['party_prefered']},function(err,doc){
                      VoterModel.deleteMany({ "name":args['name'],"place":args['place'], "party_prefered":args['party_prefered']},);
                      }).exec();
                      return voter;
                  }
              },

              create_area: {
                  type: AreaType,
                  args: {
                      name: { type: GraphQLNonNull(GraphQLString) },
                      opposition: { type: GraphQLNonNull(GraphQLString) },
                      winner: { type: GraphQLNonNull(GraphQLString) },
                      opposition_party: { type: GraphQLNonNull(GraphQLString) },
                      winning_party: { type: GraphQLNonNull(GraphQLString) },
                  },
                  resolve: (root, args, context, info) => {
                      var area = new AreaModel(args);
                      return area.save();
                  }
              },
              update_area: {
                  type: AreaType,
                  args: {
                    id: { type: GraphQLNonNull(GraphQLID) },
                    name: { type: GraphQLNonNull(GraphQLString) },
                    opposition: { type: GraphQLNonNull(GraphQLString) },
                    winner: { type: GraphQLNonNull(GraphQLString) },
                    opposition_party: { type: GraphQLNonNull(GraphQLString) },
                    winning_party: { type: GraphQLNonNull(GraphQLString) },
                  },
                  resolve: (root, args, context, info) => {
                      var area = AreaModel.find(args['id'],function(err,area){
                        area['name']=args['name'];
                        area['opposition']=args['opposition'];
                        area['winner']=args['winner'];
                        area['opposition_party']=args['opposition_party'];
                        area['winning_party']=args['winning_party'];
                        return area.save();
                      });
                  }
               },
               delete_area: {
                   type: CandidateType,
                   args: {
                     name: { type: GraphQLNonNull(GraphQLString) },
                     opposition: { type: GraphQLNonNull(GraphQLString) },
                     winner: { type: GraphQLNonNull(GraphQLString) },
                   },
                   resolve: (root, args, context, info) => {
                       var area = AreaModel.find({ "name":args['name'],"opposition":args['opposition'], "winner":args['winner']},function(err,doc){
                         AreaModel.deleteMany({ "name":args['name'],"opposition":args['opposition'], "winner":args['winner']},).exe();
                       }).exec();
                       return area;
                   }
               },

               cast_vote: {
                 type: VoterType,
                 args: {
                     name: { type: GraphQLNonNull(GraphQLString) }
                 },
                 resolve: (root, args, context, info) => {
                   var voter = VoterModel.findOne({ "name":args['name']},function(err,voter){

                     var candidate = CandidateModel.find({ "party":voter['party_prefered']},function(err,candidate){

                       for(var i=0;i<candidate.length;i++)
                       {
                         if(candidate[i]['votes']=="NaN")candidate[i]['votes']="0";
                         var num=parseInt(candidate[i]['votes'])+1;
                         candidate[i]['votes']=num.toString();
                         candidate[i].save();
                       }
                     }).exec();

                      return voter;
                   }).exec();
                 }
               },

               areas_vote_prediction: {
                 type: AreaType,
                 args: {
                     name: { type: GraphQLNonNull(GraphQLString) }
                 },
                 resolve: (root, args, context, info) => {
                   var area = AreaModel.findOne({ "name":args['name']},function(err,area){

                     var candidate = CandidateModel.find({ "place":args['name']},function(err,candidate){

                       area['winning_party']=candidate[candidate.length-1]['party'];
                       area['opposition_party']="None";
                       area['winner']=candidate[candidate.length-1]['name'];
                       area['opposition']="None";
                       mxvotes=-1;

                      for(var i=0;i<candidate.length;i++)
                      {
                        if(parseInt(candidate[i]['votes'])>mxvotes && parseInt(candidate[i]['age'])>=18)
                        {
                          area['opposition_party']=area['winning_party'];
                          area['winning_party']=candidate[i]['party'];
                          area['opposition']=area['winner'];
                          area['winner']=candidate[i]['name'];
                          mxvotes=parseInt(candidate[i]['votes']);
                        }
                      }
                       area.save();
                     }).exec();

                     return area;
                   }).exec();
                 }
               }


        }
    }),
});

app.use(db.init)
app.use("/graphql", ExpressGraphQL({
   schema: schema,
   graphiql: true
}));

app.listen(3001, () => {
   console.log("Listening at :3001...");
});
