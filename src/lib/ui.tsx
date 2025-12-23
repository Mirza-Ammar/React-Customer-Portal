import React from "react";

// Horizontal spacing
export const HSpaceTiny = () => <div style={{ width: 5 }} />;
export const HSpaceSmall = () => <div style={{ width: 10 }} />;
export const HSpaceRegular = () => <div style={{ width: 18 }} />;
export const HSpaceMedium = () => <div style={{ width: 25 }} />;
export const HSpaceLarge = () => <div style={{ width: 50 }} />;

// Vertical spacing
export const VSpaceTiny = () => <div style={{ height: 5 }} />;
export const VSpaceSmall = () => <div style={{ height: 10 }} />;
export const VSpaceRegular = () => <div style={{ height: 18 }} />;
export const VSpaceMedium = () => <div style={{ height: 25 }} />;
export const VSpaceLarge = () => <div style={{ height: 50 }} />;

// Screen size helpers
export const screenWidth = () => window.innerWidth;
export const screenHeight = () => window.innerHeight;
