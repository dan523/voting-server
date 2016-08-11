import {List, Map} from 'immutable';

export const INITIAL_STATE = Map();

/**
 * Set the entries for the state
 * 
 * @export
 * @param {any} state
 * @param {List} entries
 */
export function setEntries(state, entries) {
    return state.set('entries', List(entries));
}

/**
 * Return the next state ready for vote
 * 
 * @export
 * @param {any} state
 * @returns
 */
export function next(state) {
    let entries = state.get('entries').concat(getWinners(state.get('vote')));
    if (entries.size === 1) {
        return state
            .remove('vote')
            .remove('entries')
            .set('winner', entries.first());
    } else {
        return state.merge({
            vote: Map({pair: entries.take(2)}),
            entries: entries.skip(2)
        });
    }
}

/**
 * Vote for the specific entry in the state
 * 
 * @export
 * @param {any} voteState
 * @param {string} entry
 * @returns
 */
export function vote(voteState, entry) {
    if (voteState.has('tally') && !voteState.hasIn(['tally', entry])) {      
        return voteState;    
    }
    
    return voteState.updateIn(
        ['tally', entry],
        0,
        tally => tally + 1
    );
}

/**
 * Check the vote tally and return the winner, or both if tied
 * 
 * @export
 * @param {Map} vote
 * @returns
 */
export function getWinners(vote) {
    if (!vote) return [];
    
    const [a, b] = vote.get('pair');
    const aVotes = vote.getIn(['tally', a], 0);
    const bVotes = vote.getIn(['tally', b], 0);

    if (aVotes > bVotes) return [a];
    else if (bVotes > aVotes) return [b];
    else return [a, b];
}