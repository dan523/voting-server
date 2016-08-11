import {List, Map} from 'immutable';
import {expect} from 'chai';
import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {
    describe('setEntries', () => {
        it('adds the entries to the state', () => {
            const state = Map();
            const entries = List.of('Trainspotting', '28 Days Later');
            const nextState = setEntries(state, entries);

            expect(nextState).to.equal(Map({
                entries: List.of('Trainspotting', '28 Days Later')
            }));
        });

        it('converts to immutable', () => {
            const state = Map();
            const entries = ['Trainspotting', '28 Days Later'];
            const nextState = setEntries(state, entries);

            expect(nextState).to.equal(Map({
                entries: List.of('Trainspotting', '28 Days Later')
            }));
        });
    });    

    describe('next', () => {
        it('takes the next two entries under vote', () => {
            const state = Map({
                entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
            });
            const nextState = next(state);

            expect(nextState).to.equal(Map({
                vote: Map({
                    id: 0,
                    pair: List.of('Trainspotting', '28 Days Later')
                }),
                entries: List.of('Sunshine')
            }));
        });

        it('puts winner of vote back into entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 4,
                        '28 Days Later': 2
                    })
                }),
                entries: List.of('Sunshine', 'Millions', '127 Hours')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({                
                vote: Map({
                    id: 0,
                    pair: List.of('Sunshine', 'Millions')
                }),
                entries: List.of('127 Hours', 'Trainspotting')
            }));
        });

        it('puts both from tied vote back into entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 3,
                        '28 Days Later': 3
                    })
                }),
                entries: List.of('Sunshine', 'Millions', '127 Hours')
            });
            const nextState = next(state);
                expect(nextState).to.equal(Map({
                vote: Map({
                    id: 0,
                    pair: List.of('Sunshine', 'Millions')
                }),
                entries: List.of('127 Hours', 'Trainspotting', '28 Days Later')
            }));
        });

        it('marks the winner when just one entry left', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 4,
                        '28 Days Later': 2          
                    })
                }),
                entries: List()
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                winner: 'Trainspotting'
            }));
        });

        it('gives an initial identifier', () => {
            const state = Map({
                entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
            });
            const nextState = next(state);

            expect(nextState).to.equal(Map({
                vote: Map({
                    id: 0,
                    pair: List.of('Trainspotting', '28 Days Later')
                }),
                entries: List.of('Sunshine')
            }));
        });

        it('gives a unique identifier', () => {
            const state = Map({
                vote: Map({
                    id: 0,
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 4,
                        '28 Days Later': 2          
                    })
                }),
                entries: List.of('Sunshine')
            });

            const nextState = next(state);

            expect(nextState).to.equal(Map({
                vote: Map({
                    id: 1,
                    pair: List.of('Sunshine', 'Trainspotting')
                }),
                entries: List()
            }));
        });
    });

    describe('vote', () => {
        it('creates a tally for the next entry', () => {
            const state = Map({
                    pair: List.of('Trainspotting', '28 Days Later')
                });
            const nextState = vote(state, 'Trainspotting');

            expect(nextState).to.equal(Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 1
                    })
                }));            
        });

        it('adds to the existing tally for the voted entry', () => {
            const state = Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 3,
                        '28 Days Later': 2
                    })
                });
            const nextState = vote(state, 'Trainspotting');
            expect(nextState).to.equal(Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 4,
                        '28 Days Later': 2
                    })
                }));
        });

        it('doesnt let you vote for an invalid entry', () => {
            const state = Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 3,
                        '28 Days Later': 2
                    })
                });
            const nextState = vote(state, 'Sunshine');
            expect(nextState).to.equal(Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 3,
                        '28 Days Later': 2
                    })
                }));    
        });
    });
});