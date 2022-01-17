// @flow

import type {MapAreas} from "../../map/MainMapImageMapper";
import type {Haven} from "../../../services/queries/haven/GetHavensQuery";

const cos30 = Math.cos(Math.PI / 6);

const sen30 = 0.5;

/**
 * Builds the single area, given the coords and the other information of the area.
 * @param title The area title
 * @param fillColor The area fill colour.
 * @param coords The area coords
 * @return {MapAreas} The area.
 */
export const buildArea = (title: string, fillColor: string, coords: Array<[number, number]>): MapAreas => ({
    "title": title,
    "shape": "poly",
    "coords": coords.flatMap(([x, y]) => [x, y]),
    "fillColor": fillColor,
    "strokeColor": "black",
    "lineWidth": 2,
    "preFillColor": "#59191940"
});

/**
 * Computes the hexagonal coords given the hexagon center and its radius.
 * @param center The hexagon center in coordinates.
 * @param radius The hexagon radius.
 * @return {[number,number][]} The hexagon map coordinates.
 */
export const computeHexagonCoords = (center: [number, number], radius: number): Array<[number, number]> => {
    const [x, y] = center;
    const r = radius;

    const positiveOrZero = x => x >= 0 ? x : 0;

    return [
        [x, positiveOrZero(y - r)],
        [Math.round(x + r * cos30), positiveOrZero(Math.round(y - r * sen30))],
        [Math.round(x + r * cos30), Math.round(y + r * sen30)],
        [Math.round(x), Math.round(y + r)],
        [positiveOrZero(Math.round(x - r * cos30)), Math.round(y + r * sen30)],
        [positiveOrZero(Math.round(x - r * cos30)), positiveOrZero(Math.round(y - r * sen30))]
    ];
};

/**
 * Draws a line of hexagons of determined length.
 * @param index The row index.
 * @param havens The havens.
 * @param radius Each hexagon radius.
 * @return {Array<MapAreas>} The array of map areas.
 */
export const drawLine = (index: number, havens: Array<Haven>, radius: number): Array<MapAreas> => {
    const d = 2 * radius * cos30;

    const [x1, y1] = [
        radius + (index % 2 === 1 ? radius * cos30 : 0),
        radius + d * cos30 * index
    ];

    return havens.map((haven, i) => buildArea(
        haven?.name ?? `Posizione ${i} - ${index}`,
        "#19791980",
        computeHexagonCoords([x1 + d * i, y1], radius)));
};
